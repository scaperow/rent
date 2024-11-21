import { PartialType } from '@nestjs/mapped-types';
import { CreateContractPriceDto } from './create-contract-price.dto';

export class UpdateContractPriceDto extends PartialType(CreateContractPriceDto) {}
