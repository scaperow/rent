import { Appointment, Contract, ContractStatus, Customer, Order, Project } from './../../src/src/schema';
export declare class CreateContractDto implements Contract {
    number: string;
    id: number;
    customerId: number;
    customer: Customer;
    projectId: number;
    project: Project;
    startAt: Date;
    endAt?: Date;
    status: ContractStatus;
    createdAt: Date;
    updatedAt: Date;
    reviseId?: number;
    revise?: Contract;
    revises?: Contract[];
    appointments?: Appointment[];
    order?: Order[];
}
