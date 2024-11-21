import { Contract, Material } from './../../src/src/schema';
import { PartialType } from '@nestjs/mapped-types';

export class BatchOrderDto {
  materials: { [index: number]: [{ count: number; date: Date }] };
  contract: Contract;
}
