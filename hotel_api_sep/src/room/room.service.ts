import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.interface';
import Room_db from '../local_db';
import { RoomReservationDetails, stats } from './dto/room.dto';
import { generateRoomReservationDetails, generateRooms } from '../faker/fake';
import { Cron, CronExpression } from '@nestjs/schedule';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class RoomService {
  private static instance: RoomService;
  rooms: Room[] = Room_db;

  static getInstance(): RoomService {
    if (!RoomService.instance) {
      RoomService.instance = new RoomService();
    }
    return RoomService.instance;
  }

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
          room.previousReservationDetails.push(room.reservationDetails);
        }
      }
      return room;
    });

    this.rooms = [...allRooms];
  }

  // stats
  async stats(): Promise<stats> {
    const totalUser = await clerkClient.users.getCount();
    const finishedReservations = this.rooms.reduce(
      (acc, room) => acc + room.previousReservationDetails.length,
      0,
    );
    const pendingReservations = this.rooms.filter(
      (room) => room.reserved,
    ).length;
    const reservations =
      this.rooms.reduce(
        (acc, room) => acc + room.nextReservationDetails.length,
        0,
      ) +
      finishedReservations +
      pendingReservations;
    // Calculate income
    const income = this.rooms.reduce((acc, room) => {
      const finishedReservationsIncome = room.previousReservationDetails.reduce(
        (total, reservation) =>
          total + reservation.price * reservation.numberOfDays,
        0,
      );
      const pendingReservationsIncome = room.reserved
        ? room.reservationDetails.price
        : 0;
      const nextReservationsIncome = room.nextReservationDetails.reduce(
        (total, reservation) => total + reservation.price,
        0,
      );
      return (
        acc +
        finishedReservationsIncome +
        pendingReservationsIncome +
        nextReservationsIncome
      );
    }, 0);
    return {
      users: totalUser,
      rooms: this.rooms.length,
      reservations: reservations,
      pendingReservations: pendingReservations,
      finishedReservations: finishedReservations,
      income: income,
    };
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

  async populateRoomsWithReservations(num: number) {
    const roomsAndResGen = await generateRoomReservationDetails(num, this);
    if (typeof roomsAndResGen === 'string') {
      return roomsAndResGen;
    } else {
      roomsAndResGen.forEach((roomAndRes) => {
        const room = this.rooms.find((room) => room.id === roomAndRes.roomId);
        if (room) {
          // attibuer la reservation to the type of reservation (futur, current , previous)
          // attribute value to reserved boolean based on the reservation type
          room.reserved = roomAndRes.dateType === 'ongoing';
          room.reserved
            ? (room.reservationDetails = roomAndRes.resDetail)
            : roomAndRes.dateType === 'past'
            ? room.previousReservationDetails.push(roomAndRes.resDetail)
            : room.nextReservationDetails.push(roomAndRes.resDetail);
        }
      });
      return this.rooms;
    }
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
  findReservationDetailById(id: number): RoomReservationDetails | string {
    const temp_db = this.rooms.find((room) => room.id === id);
    if (temp_db.reserved) {
      return temp_db.reservationDetails;
    } else {
      return 'Not reserved so no reservation details';
    }
  }

  // reserver une chambre
  reserveRoom(id: number, reservation_details: RoomReservationDetails) {
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

  // modification d'une reservation
  updateReservation(
    id: number,
    reservation_details: Partial<RoomReservationDetails>,
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
}
