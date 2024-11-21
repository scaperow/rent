import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateCustomerDto: UpdateCustomerDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
