import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Address } from '../address/address.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { HotelRating } from './hotel.enum';

@Entity()
export class Hotel extends OrmUuidTimestampEntity {

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @Column({ type: 'varchar', length: 11 })
  public contact_phone!: string;

  @Column({
    type: 'enum',
    enum: HotelRating,
  })
  public rating!: HotelRating;

  @OneToOne(() => Address, { nullable: false, eager: true, onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'address_id' })
  public address!: Address;

  @OneToMany(() => Room, (room) => room.hotel)
  public rooms!: Room[];

}
