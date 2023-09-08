import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength
} from 'class-validator';

import {
  PropertyLocation,
  PropertyStatus,
  PropertyType
} from '@/modules/location/location.schema';

export class CreateLocationDTO {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsEnum(PropertyLocation)
  location: PropertyLocation;

  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @IsNotEmpty()
  @IsNumber()
  areaSqFt: number;
}
