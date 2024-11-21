import { PrismaClient, PrismaPromise } from '@prisma/client';
import { ContractService } from './../contract/contract.service';
import {
  Contract,
  Material,
  Order,
  OrderFlow,
  OrderStatus,
} from './../src/src/schema';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BatchOrderDto } from './dto/batch-order.dto';
import { get, map, chain, isEmpty, reduce } from 'lodash';
import { number } from 'joi';
import { MaterialService } from 'prisma/material/material.service';
import { getNumber, NumberName } from 'src/utils';
const moment = require('moment');
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly materialService: MaterialService,
    private readonly contractService: ContractService,
  ) {}

  async getMaxOrder(contractId: number) {
    // if (maxOrder < 0) {
    return (await this.orderService.generateNumber(contractId)) || 0;
    // }

    // return maxOrder + 1;
  }

  async generateName(contractId: number, maxId: number) {
    // const maxId = await this.getMaxOrder(contractId);

    return [
      'CO',
      String(contractId).padStart(3, '0'),
      String(maxId + 1).padStart(3, '0'),
    ].join('-');
  }

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    createOrderDto.name = getNumber(NumberName.TRANSACTION_ORDER);

    const created = await this.orderService.create(createOrderDto, {
      crudQuery,
    });

    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.orderService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.orderService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.orderService.update(id, updateOrderDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.orderService.remove(id, { crudQuery });
  }

  @Post('batch')
  async batch(
    @Body() batchOrderDto: BatchOrderDto,
    @Query('preview') preview: boolean,
    @Query('crudQuery') crudQuery: string,
  ) {
    const inOrders: { [index: string]: Partial<Order> } = {};
    const outOrders: { [index: string]: Partial<Order> } = {};
    const materialIds = Object.keys(batchOrderDto.materials).map(parseInt);
    const materials = await this.materialService.findMany({
      crudQuery: {
        joins: ['unit'],
        where: {
          id: {
            in: materialIds,
          },
        },
        pageSize: 999999,
      },
    });
    const contract = await this.contractService.findOne(
      batchOrderDto.contract.id,
      {
        crudQuery: {
          joins: ['customer', 'project'],
        },
      },
    );

    const materialsMap: { [index: number]: Material } = reduce<{
      [index: number]: Material;
    }>(
      materials.data,
      (result: { [index: number]: Material }, current) => {
        result[current.id] = current;
        return result;
      },
      {},
    );

    materialIds.map((materialId: number) => {
      const material = materialsMap[materialId];

      batchOrderDto.materials[materialId].map((transaction) => {
        const date = moment(transaction.date).format('YYYY-MM-DD');
        const flow = transaction.count < 0 ? OrderFlow.IN : OrderFlow.OUT;
        const pickOrders = flow === OrderFlow.IN ? inOrders : outOrders;

        let existOrder: Partial<Order> = get(inOrders, date);
        if (isEmpty(existOrder)) {
          existOrder = {
            flow,
            createdAt: transaction.date,
            updatedAt: transaction.date,
            materials: [],
            status: OrderStatus.DRAFT,
          };

          pickOrders[date] = existOrder;
        }

        existOrder.materials.push({
          //@ts-ignore
          material: { id: material.id },
          count: Math.abs(transaction.count),
          //@ts-ignore
          unit: { id: material.unit.id },
        });
      });
    });

    if (preview) {
      return {
        contract,
        materials: materials.data,
        orders: [...Object.values(inOrders), ...Object.values(outOrders)],
      };
    }

    const allOrders = await Promise.all(
      [...Object.values(inOrders), ...Object.values(outOrders)]
        .filter((order) => !isEmpty(order))
        .map(async (order) => {
          order.name = getNumber(NumberName.TRANSACTION_ORDER);
          order.customer = contract.customer;
          order.user = {
            id: 1,
            username: 'admin',
            email: 'scaperow@hotmail.com',
          };
          //@ts-ignore
          order.contract = { id: contract.id };
          //@ts-ignore
          order.project = { id: contract.project.id };
          //@ts-ignore
          order.customer = { id: contract.customer.id };

          return order;
        }),
    );

    try {
      await OrderService.prismaClient.$transaction(
        this.orderService.createMany(allOrders, {
          crudQuery,
        }),
      );

      return {
        count: allOrders.length,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
