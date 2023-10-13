import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { BookingStatus } from './booking.enum';

@Entity()
export class Booking extends OrmUuidTimestampEntity {

  @Column({ type: 'int2' })
  public guests_number: number;

  @Column({ type: 'timestamp' })
  public checkin_date: Date;

  @Column({ type: 'timestamp' })
  public checkout_date: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
  })
  public status: BookingStatus;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @OneToOne(() => Hotel, { nullable: false })
  @JoinColumn({ name: 'hotel_id' })
  public hotel: Hotel;

  @OneToOne(() => Room, { nullable: false })
  @JoinColumn({ name: 'room_id' })
  public room: Room;

}
