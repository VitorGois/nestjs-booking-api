import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Room extends OrmUuidTimestampEntity {

  @Column({ type: 'int2' })
  public single_bed: number;

  @Column({ type: 'int2' })
  public double_bed: number;

  @Column({ type: 'bool', default: false })
  public assigned: boolean;

  @Column({ type: 'int2' })
  public number: number;

  @Column({ type: 'numeric' })
  public price: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotel_id' })
  public hotel: Hotel;

}
