import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

import { OrmQueryOrder } from './orm.enum';

export class OrmPageReadDto {

  @ApiProperty({ example: 100, default: 1000, nullable: true })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string, 10))
  @IsInt() @Min(1) @Max(1000)
  public perPage?: number = 1000;

  @ApiProperty({ example: 1, default: 1, nullable: true })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string, 10))
  @IsInt() @Min(1)
  public page?: number = 1;

  @ApiProperty({ example: true, default: false, nullable: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public count?: boolean = false;

  @ApiProperty({ example: 'name', default: 'id', nullable: true })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public sort?: string;

  @ApiProperty({ enum: OrmQueryOrder, example: OrmQueryOrder.ASC, default: OrmQueryOrder.ASC, nullable: true })
  @IsOptional()
  @IsEnum(OrmQueryOrder)
  public order? = OrmQueryOrder.ASC;

}

export class OrmUuidReadDto {

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  public id!: string;

}
