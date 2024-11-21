import { Contract, Customer, Driver, Order, OrderFlow, OrderLoss, OrderMaterial, OrderStatus, Project, User, Waybill } from './../../src/src/schema';
export declare class CreateOrderDto implements Order {
    id: number;
    name: string;
    customerId: number;
    customer: Customer;
    flow: OrderFlow;
    createdAt: Date;
    updatedAt: Date;
    materials?: OrderMaterial[];
    losses?: OrderLoss[];
    userId: number;
    user: User;
    status: OrderStatus;
    contractId: number;
    contract: Contract;
    driverId?: number;
    driver?: Driver;
    waybills?: Waybill[];
    projectId: number;
    project: Project;
}
