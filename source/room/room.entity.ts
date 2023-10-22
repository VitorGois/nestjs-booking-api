import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Booking } from '../booking/booking.entity';
import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Room extends OrmUuidTimestampEntity {

  @Column({ type: 'int2' })
  public singleBed: number;

  @Column({ type: 'int2' })
  public doubleBed: number;

  @Column({ type: 'int2' })
  public number: number;

  @Column({ type: 'numeric' })
  public price: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotelId' })
  public hotel: Hotel;

  @OneToMany(() => Booking, (booking) => booking.user)
  public bookings: Booking[];

}
