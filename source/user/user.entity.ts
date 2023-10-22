import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { Booking } from '../booking/booking.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
@Unique([ 'email' ])
@Unique([ 'taxId' ])
export class User extends OrmUuidTimestampEntity {

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public email!: string;

  @Column({
    type: 'varchar',
    length: 14,
    unique: true,
  })
  public taxId!: string;

  @Column({ type: 'varchar', length: 11 })
  public phone!: string;

  @Column({ type: 'timestamp' })
  public birthdate!: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  public bookings: Booking[];

}
