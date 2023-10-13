import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

import { OrmQueryOrder } from './orm.enum';

export class OrmPageReadDto {

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string, 10))
  @IsInt() @Min(1) @Max(1000)
  public perPage?: number = 1000;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string, 10))
  @IsInt() @Min(1)
  public page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public count?: boolean;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public sort?: string;

  @IsOptional()
  @IsEnum(OrmQueryOrder)
  public order? = OrmQueryOrder.ASC;

}
