import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { OrmQueryOrder } from './orm.enum';

export class OrmPageDto<T> {

  @IsInt() @Min(1) @Max(1000)
  public perPage: number = 1000;

  @IsInt() @Min(1)
  public page: number = 1;

  @IsOptional()
  @IsInt() @Min(0)
  public count?: number;

  @IsOptional()
  @IsString()
  public sort?: string;

  @IsOptional()
  @IsEnum(OrmQueryOrder)
  public order?: OrmQueryOrder;

  @IsArray()
  public records: T[];

}
