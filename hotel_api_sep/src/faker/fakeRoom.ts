import { faker } from '@faker-js/faker';
import { Room } from '../room/room.interface';

export function generateRooms(n: number): Room[] {
  const rooms: Room[] = Array.from({ length: n }, (_, i) => ({
    id: i,
    name: faker.commerce.productName(),
    reserved: false,
    details: faker.lorem.paragraph(),
    price: parseFloat(faker.commerce.price()),
    reservationDetails: null,
  }));
  return rooms;
}
