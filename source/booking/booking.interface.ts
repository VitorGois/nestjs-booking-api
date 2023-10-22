import { Hotel } from '../hotel/hotel.entity';
import { Room } from '../room/room.entity';

export interface BookingExistenceParams {
  room: Room;
  hotel: Hotel;
  checkoutDate: Date;
  checkInDate: Date;
  guests: number;
}
