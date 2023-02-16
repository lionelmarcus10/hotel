import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { Room } from './room.interface';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // toute les chambres
  @Get('')
  findAllRooms(): Room[] {
    return this.roomService.findAllRooms();
  }

  // chambres disponibles
  @Get('/disponible')
  findDisponibleRooms(): Room[] {
    return this.roomService.findDisponibleRooms();
  }

  // chambres non disponibles
  @Get('/reserved')
  findReservedRooms(): Room[] {
    return this.roomService.findReservedRooms();
  }

  // detail d'une chambre
  @Get('/rooms/:id')
  findRoomById(@Param('id') id: string): Room {
    return this.roomService.findRoomById(+id);
  }

  // detail d'une reservation
  @Get('/reservations/:id')
  findReservationById(@Param('id') id: string): string {
    return this.roomService.findReservationDetailById(+id);
  }

  // reserver une chambre
  @Patch('/reserver/:id/:reservation_details')
  reserveRoom(
    @Param('id') id: string,
    @Param('reservation_details') reservation_details: string,
  ) {
    return this.roomService.reserveRoom(+id, reservation_details);
  }

  // suppression d'une reservation
  @Delete('/reservations/delete/:id')
  deleteReservation(@Param('id') id: string): string | NotFoundException {
    return this.roomService.deleteReservation(+id);
  }

  // modifier une reservation
  @Patch('/reservations/update/:id/:reservation_details')
  updateReservation(
    @Param('id') id: string,
    @Param('reservation_details') reservation_details: string,
  ): string | NotFoundException {
    return this.roomService.updateReservation(+id, reservation_details);
  }
}
