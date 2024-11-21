export interface User {
  id: number;
  username: string;
  email: string;
  orders?: Order[];
}

export interface Customer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  address?: string;
  description?: string;
  gender?: Gender;
  name: string;
  tel: string;
  projects?: Project[];
  orders?: Order[];
  contracts?: Contract[];
  balance: number;
  consumptions?: Consumption[];
}

export interface MaterialCategory {
  id: number;
  name: string;
  materials?: Material[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Material {
  id: number;
  categoryId: number;
  category: MaterialCategory;
  unitId: number;
  unit: Unit;
  count?: string;
  description?: string;
  hasVariant: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  units?: UnitConversion[];
  properties?: PropertyOnMaterial[];
  fee?: number;
  salePrice?: number;
  purchasePrice?: number;
  masterId?: number;
  master?: Material;
  children?: Material[];
  disabled: boolean;
  orderMaterial?: OrderMaterial[];
  materialLosses?: MaterialLoss[];
  waybillBoxes?: WaybillBox[];
  losses?: Loss[];
  contractPrice?: ContractPrice[];
}

export interface MaterialProperty {
  id: number;
  name: string;
  unitId?: number;
  unit?: Unit;
  createdAt: Date;
  updatedAt: Date;
  predefineds?: MaterialPropertyValue[];
  propertyOnMaterials?: PropertyOnMaterial[];
}

export interface PropertyOnMaterial {
  id: number;
  materialId: number;
  material: Material;
  materialPropertyId: number;
  materialProperty: MaterialProperty;
  value?: string;
  createdAt: Date;
  updatedAt: Date;
  propertyValueId?: number;
  propertyValue?: MaterialPropertyValue;
}

export interface MaterialPropertyValue {
  id: number;
  value: string;
  materialProperty?: MaterialProperty;
  materialPropertyId?: number;
  propertyOnMaterials?: PropertyOnMaterial[];
}

export interface Project {
  id: number;
  address?: string;
  customerId: number;
  customer: Customer;
  description?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  contracts?: Contract[];
  orders?: Order[];
}

export interface Unit {
  id: number;
  disabled: boolean;
  name: string;
  unitConversions?: UnitConversion[];
  createdAt: Date;
  updatedAt: Date;
  material?: Material[];
  materialProperties?: MaterialProperty[];
  materialLosses?: MaterialLoss[];
  waybillBox?: WaybillBox[];
  orderMaterials?: OrderMaterial[];
}

export interface UnitConversion {
  id: number;
  materialId: number;
  material: Material;
  unitId: number;
  unit: Unit;
  factor?: string;
  fee?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: number;
  number: string;
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
  orders?: Order[];
  prices?: ContractPrice[];
}

export interface Consumption {
  id: number;
  customerId: number;
  customer: Customer;
  status: ConsumptionStatus;
  createdAt: Date;
  paymentMode: PaymentMode;
  paymentAmount: number;
  paymentToAccount?: string;
  paymentToName?: string;
  appointmentId?: number;
  appointment?: Appointment;
}

export interface Appointment {
  id: number;
  contractId: number;
  contract: Contract;
  condition: AppointmentCondition;
  forLessor?: boolean;
  forTenantry?: boolean;
  payAmount: number;
  payRule: PayRule;
  status: AppointmentStatus;
  automaticDeduction: boolean;
  deductionConsumptions?: Consumption[];
  performedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
  endAt: Date;
}

export interface Order {
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

export interface Waybill {
  id: number;
  orderId: number;
  order: Order;
  createdAt: Date;
  updatedAt: Date;
  startAt: Date;
  endAt: Date;
  status: WaybillStatus;
  driverId: number;
  driver: Driver;
  boxes?: WaybillBox[];
}

export interface WaybillBox {
  id: number;
  waybillId: number;
  waybill: Waybill;
  materialId: number;
  material: Material;
  count: number;
  unitId: number;
  unit: Unit;
}

export interface Driver {
  id: number;
  name: string;
  tel: string;
  carNumber: string;
  createdAt: Date;
  updatedAt: Date;
  address?: string;
  description?: string;
  Order?: Order[];
  shipping?: Waybill[];
}

export interface OrderMaterial {
  id: number;
  materialId: number;
  material: Material;
  count: number;
  unitId: number;
  unit: Unit;
  orderId: number;
  order: Order;
  losses?: OrderLoss[];
}

export interface OrderLoss {
  id: number;
  lossId: number;
  loss: Loss;
  count: number;
  orderMaterialId: number;
  orderMaterial: OrderMaterial;
  orderId: number;
  order: Order;
  createdAt: Date;
  updatedAt: Date;
}

export interface Loss {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  materials?: Material[];
  orderLosses?: OrderLoss[];
  materialLoss?: MaterialLoss[];
}

export interface MaterialLoss {
  id: number;
  materialId: number;
  material: Material;
  lossId: number;
  loss: Loss;
  payAmount: number;
  payUnitId?: number;
  payUnit?: Unit;
  autoFill: boolean;
  autoFillCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractPrice {
  id: number;
  materialId: number;
  material: Material;
  fee: number;
  salePrice: number;
  purchasePrice?: number;
  contractId: number;
  contract: Contract;
}

export enum Gender {
  MALE = 'MALE',
  FAMALE = 'FAMALE',
}

export enum ContractStatus {
  DRAFT = 'DRAFT',
  FORMAL = 'FORMAL',
  ABNORMAL = 'ABNORMAL',
  ABORTED = 'ABORTED',
  CANCELLED = 'CANCELLED',
}

export enum AppointmentCondition {
  PAYDEPOSIT = 'PAYDEPOSIT',
  PAYLEASEFEE = 'PAYLEASEFEE',
  RETURNDEPOSIT = 'RETURNDEPOSIT',
  RETURNMATERIAL = 'RETURNMATERIAL',
}

export enum PayRule {
  ABSOLUTE = 'ABSOLUTE',
  PERCENTAGE = 'PERCENTAGE',
}

export enum ConsumptionStatus {
  SUCCESS = 'SUCCESS',
}

export enum PaymentMode {
  CASH = 'CASH',
  ALIPAY = 'ALIPAY',
  WECHAT = 'WECHAT',
}

export enum AppointmentStatus {
  NONPERFORMANCE = 'NONPERFORMANCE',
  INEXECUTION = 'INEXECUTION',
  PERFORMED = 'PERFORMED',
}

export enum OrderFlow {
  NONE = 'NONE',
  IN = 'IN',
  OUT = 'OUT',
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export enum WaybillStatus {
  NONE = 'NONE',
  INTRANSIT = 'INTRANSIT',
  Arrived = 'Arrived',
}
