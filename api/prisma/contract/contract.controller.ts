import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from "@nestjs/common";
import { ContractStatus } from "prisma/src/src/schema";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { omit } from "lodash";
import { getNumber, NumberName } from "src/utils";
import { Contract, PrismaPromise } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { OrderService } from "../order/order.service";

const prisma = new PrismaClient();

@Controller("contract")
export class ContractController {
  constructor(private readonly contractService: ContractService, private readonly  orderSerive: OrderService) {
  }

  @Post()
  async create(
    @Body() createContractDto: CreateContractDto,
    @Query("crudQuery") crudQuery: string
  ) {
    createContractDto.number = getNumber(NumberName.CONTRACT_ORDER);

    const created = await this.contractService.create(createContractDto, {
      crudQuery
    });
    return created;
  }

  @Get()
  async findMany(@Query("crudQuery") crudQuery: string) {
    const matches = await this.contractService.findMany({ crudQuery });
    return matches;
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Query("crudQuery") crudQuery: string
  ) {
    const match = await this.contractService.findOne(Number(id), { crudQuery });
    return match;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateContractDto: UpdateContractDto,
    @Query("crudQuery") crudQuery: string
  ) {
    const original = await this.contractService.findOne(Number(id), { crudQuery: {} }) as Contract;

    //@ts-ignore
    return await prisma.$transaction(async (tx: any) => {
      const newly = await this.contractService.create({
        ...original,
        ...updateContractDto,
        number: getNumber(NumberName.CONTRACT_ORDER),
        //@ts-ignore
        reviseId: Number(id),
        id: undefined
      }, {
        crudQuery: { joins: ["revise"] },
        prismaTransaction: tx
      });
      const oldly = await this.contractService.update(
        Number(id),
        {
          status: ContractStatus.CANCELLED
        },
        {
          crudQuery: { joins: ["revise"] },
          prismaTransaction: tx
        }
      );

      await this.orderSerive.updateMany({
        contractId: newly.id 
        }, {
          crudQuery: { joins: ["revise"] },
          prismaTransaction: tx
        },
        {
          contract: { id: Number(id) }
        }
      );

      return newly;
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Query("crudQuery") crudQuery: string) {
    return this.contractService.remove(Number(id), { crudQuery });
  }
}
