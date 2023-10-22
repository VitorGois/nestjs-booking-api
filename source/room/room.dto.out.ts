import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { OrmPageDto } from '../orm/orm.dto.out';
import { OrmUuidEntity } from '../orm/orm.entity';
import { Room } from './room.entity';

export class RoomDto extends IntersectionType(OrmUuidEntity, PickType(Room, [ 'singleBed', 'doubleBed', 'number', 'price' ] as const)) { }

export class RoomPageDto extends OrmPageDto<RoomDto> {

  @ApiProperty({ isArray: true, type: RoomDto, description: 'Rooms' })
  @IsObject() @Type(() => RoomDto)
  @ValidateNested({ each: true })
  public records: RoomDto[];

}
