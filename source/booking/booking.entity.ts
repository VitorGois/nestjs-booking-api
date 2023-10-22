import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { BookingStatus } from './booking.enum';

@Entity()
export class Booking extends OrmUuidTimestampEntity {

  @Column({ type: 'int2' })
  public guests!: number;

  @Column({ type: 'timestamp' })
  public checkInDate!: Date;

  @Column({ type: 'timestamp' })
  public checkoutDate!: Date;

  @Column({
    // type: 'enum',
    type: 'varchar',
    // enum: BookingStatus,
  })
  public status!: BookingStatus;

  @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
  @JoinColumn({ name: 'userId' })
  public user!: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings, { nullable: false })
  @JoinColumn({ name: 'hotelId' })
  public hotel!: Hotel;

  @ManyToOne(() => Room, (room) => room.bookings, { nullable: false })
  @JoinColumn({ name: 'roomId' })
  public room!: Room;

}
