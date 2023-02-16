/* eslint-disable prettier/prettier */
import { Room } from './room/room.interface';

// database
const Room_db: Room[] = [
  {
    id: 1,
    name: 'Room 300',
    disponible: true,
    reserved: false,
    details: 'Room 300 is a large room with a capacity of 6 people',
    price: 100,
    reservation_details: null,
  },
  {
    id: 2,
    name: 'Room 301',
    disponible: true,
    reserved: false,
    details:
      'Room 301 has a capacity of 4 people and is located on the first floor',
    price: 200,
    reservation_details: null,
  },
  {
    id: 3,
    name: 'Room 303',
    disponible: true,
    reserved: false,
    details: 'just for private meetings',
    price: 600,
    reservation_details: null,
  },
  {
    id: 4,
    name: 'Room 304',
    disponible: false,
    reserved: true,
    details: 'Room 304 is an individual room',
    price: 700,
    reservation_details: 'John Doe',
  },
  {
    id: 5,
    name: 'Room 305',
    disponible: false,
    reserved: true,
    details: 'Room 304 is a room of 5 people',
    price: 300,
    reservation_details: 'Basketball team',
  },
];

export default Room_db;
