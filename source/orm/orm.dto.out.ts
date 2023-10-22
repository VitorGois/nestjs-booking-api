import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { OrmQueryOrder } from './orm.enum';

export class OrmPageDto<T> {

  @ApiProperty({ example: 100, default: 1000 })
  @IsInt() @Min(1) @Max(1000)
  public perPage: number = 1000;

  @ApiProperty({ example: 1, default: 1 })
  @IsInt() @Min(1)
  public page: number = 1;

  @ApiProperty({ example: 100, nullable: true })
  @IsOptional()
  @IsInt() @Min(0)
  public count?: number;

  @ApiProperty({ example: 'name', nullable: true })
  @IsOptional()
  @IsString()
  public sort?: string;

  @ApiProperty({ enum: OrmQueryOrder, example: OrmQueryOrder.ASC, nullable: true })
  @IsOptional()
  @IsEnum(OrmQueryOrder)
  public order?: OrmQueryOrder;

  @ApiProperty({ isArray: true })
  @IsArray()
  public records: T[];

}
