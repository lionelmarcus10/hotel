import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.interface';
import Room_db from '../local_db';
import { RoomeReservationDetails } from './dto/room.dto';
import { generateRooms } from '../faker/fakeRoom';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RoomService {
  rooms: Room[] = Room_db;

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    // console.log('Called when 1 min passed');
    let allRooms = this.rooms;
    // map all rooms and when the reserved is true check if the reservation date is passed
    allRooms = allRooms.map((room) => {
      if (room.reserved) {
        const reservationDateEnd = room.reservationDetails.reservationEndDate;
        const currentDate = new Date();
        if (currentDate > reservationDateEnd) {
          room.reserved = false;
          room.reservationDetails = null;
        }
      }
      return room;
    });

    this.rooms = [...allRooms];
  }

  //create room
  createRoom(room: Partial<Room>): Room {
    const newRoom: Room = {
      id: this.rooms.length + 1,
      ...room,
    } as unknown as Room;
    this.rooms = [...this.rooms, newRoom];
    return newRoom;
  }

  // populate rooms
  populateRooms(num: number): Room[] {
    // generate random rooms with fakerjs
    this.rooms = generateRooms(num);
    return this.rooms;
  }

  // populate rooms add
  populateAddRooms(num: number): Room[] {
    // generate random rooms with fakerjs
    this.rooms = [...this.rooms, ...generateRooms(num)];
    // check elements unicity on id field and change if needed
    const ids = new Set();
    this.rooms = this.rooms.map((room) => {
      if (ids.has(room.id)) {
        room.id = Math.floor(Math.random() * 1000);
      }
      ids.add(room.id);
      return room;
    });

    return this.rooms;
  }

  // delete all rooms
  deleteAllRooms(): string {
    this.rooms = [];
    return 'All rooms deleted successfully';
  }

  // delete a room
  deleteRoom(id: number): string | NotFoundException {
    const RoomDelete = this.rooms.find((room) => room.id === id);
    if (!RoomDelete) {
      return new NotFoundException('Room not found');
    } else {
      this.rooms = this.rooms.filter((room) => room.id !== id);
      return `Room ${id} deleted successfully`;
    }
  }

  // toute les chambres
  findAllRooms(): Room[] {
    return this.rooms;
  }

  // chambres disponibles
  findDisponibleRooms(): Room[] {
    return this.rooms.filter((room) => !room.reserved);
  }

  // chambres non disponibles
  findReservedRooms(): Room[] {
    return this.rooms.filter((room) => room.reserved);
  }

  // detail d'une chambre
  findRoomById(id: number): Room {
    // faire un truc pour chambre non existante
    return this.rooms.find((room) => room.id === id);
  }

  // detail d'une reservation
  findReservationDetailById(id: number): RoomeReservationDetails | string {
    const temp_db = this.rooms.find((room) => room.id === id);
    if (temp_db.reserved) {
      return temp_db.reservationDetails;
    } else {
      return 'Not reserved so no reservation details';
    }
  }

  // reserver une chambre
  reserveRoom(id: number, reservation_details: RoomeReservationDetails) {
    // find room
    const RoomUpdate = this.rooms.find((room) => room.id === id);
    if (!RoomUpdate) {
      return new NotFoundException('Room not found');
    } else {
      if (!RoomUpdate.reserved) {
        // update room
        RoomUpdate.reserved = true;
        RoomUpdate.reservationDetails = reservation_details;

        // update db
        const UpdatedRoom = this.rooms.map((room) =>
          room.id === id ? RoomUpdate : room,
        );
        this.rooms = [...UpdatedRoom];
        return `Room ${id} reserved successfully, reservation details : ${reservation_details}`;
      } else {
        return new NotFoundException('Room already reserved');
      }
    }
  }

  // suppression d'une reservation
  deleteReservation(id: number): string | NotFoundException {
    // find room
    const RoomUpdate = this.rooms.find((room) => room.id === id);
    if (!RoomUpdate) {
      return new NotFoundException('Room not found');
    } else {
      if (RoomUpdate.reserved) {
        // update room
        RoomUpdate.reserved = false;
        RoomUpdate.reservationDetails = null;

        // update db
        const UpdatedRoom = this.rooms.map((room) =>
          room.id === id ? RoomUpdate : room,
        );
        this.rooms = [...UpdatedRoom];
        return `Reservation for room ${id} deleted successfully`;
      } else {
        return new NotFoundException('Room not reserved');
      }
    }
  }

  // modification d'une reservation
  updateReservation(
    id: number,
    reservation_details: Partial<RoomeReservationDetails>,
  ) {
    // find room
    const RoomUpdate = this.rooms.find((room) => room.id === id);
    if (!RoomUpdate) {
      return new NotFoundException('Room not found');
    } else {
      if (RoomUpdate.reserved) {
        // update room
        RoomUpdate.reservationDetails = {
          ...RoomUpdate.reservationDetails,
          ...reservation_details,
        };

        // update db
        const UpdatedRoom = this.rooms.map((room) =>
          room.id === id ? RoomUpdate : room,
        );
        this.rooms = [...UpdatedRoom];
        return `Reservation details for room ${id} updated successfully`;
      } else {
        return new NotFoundException('Room not reserved yet');
      }
    }
  }
}
