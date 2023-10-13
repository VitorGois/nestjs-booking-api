import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Address } from '../address/address.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { HotelRating } from './hotel.enum';

@Entity()
export class Hotel extends OrmUuidTimestampEntity {

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  public address!: Address;

  @Column({ type: 'varchar', length: 11 })
  public contact_phone!: string;

  @Column({
    type: 'enum',
    enum: HotelRating,
  })
  public rating!: HotelRating;

  @OneToMany(() => Room, (room) => room.hotel)
  public rooms!: Room[];

}
