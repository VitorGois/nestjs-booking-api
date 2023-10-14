import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './room.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Room ]) ],
  exports: [ TypeOrmModule ],
})
export class RoomModule { }
