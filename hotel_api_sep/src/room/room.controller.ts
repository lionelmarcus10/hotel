import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { Room } from './room.interface';
import { RoomService } from './room.service';
import { RoomeReservationDetails } from './dto/room.dto';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/rooms/create')
  createRoom(@Body() room: { roomJSON: Partial<Room> }): Room {
    const { roomJSON } = room;
    return this.roomService.createRoom(roomJSON);
  }
  // toute les chambres
  @Get('/')
  findAllRooms(): Room[] {
    return this.roomService.findAllRooms();
  }

  @Post('/rooms/populate/add')
  populateAddRooms(@Body() populationField: { population: number }): Room[] {
    const { population } = populationField;
    return this.roomService.populateAddRooms(population);
  }

  @Post('/rooms/populate')
  populateRooms(@Body() populationField: { population: number }): Room[] {
    const { population } = populationField;
    return this.roomService.populateRooms(population);
  }

  @Delete('/rooms/delete')
  deleteAllRooms(): string {
    return this.roomService.deleteAllRooms();
  }

  @Delete('/room/delete/:id')
  deleteRoom(@Param('id') id: string): string | NotFoundException {
    return this.roomService.deleteRoom(+id);
  }

  // chambres disponibles
  @Get('/rooms/disponible')
  findDisponibleRooms(): Room[] {
    return this.roomService.findDisponibleRooms();
  }

  // chambres non disponibles
  @Get('/rooms/reserved')
  findReservedRooms(): Room[] {
    return this.roomService.findReservedRooms();
  }

  // detail d'une chambre
  @Get('/rooms/:id')
  findRoomById(@Param('id') id: string): Room {
    return this.roomService.findRoomById(+id);
  }

  // detail d'une reservation
  @Get('/rooms/reservations/:id')
  findReservationById(
    @Param('id') id: string,
  ): RoomeReservationDetails | string {
    return this.roomService.findReservationDetailById(+id);
  }

  // reserver une chambre
  @Patch('/rooms/reserver/:id')
  reserveRoom(
    @Param('id') id: string,
    @Body() reservation_details: { resDet: RoomeReservationDetails },
  ) {
    const { resDet } = reservation_details;
    return this.roomService.reserveRoom(+id, resDet);
  }

  // suppression d'une reservation
  @Delete('/rooms/reservations/delete/:id')
  deleteReservation(@Param('id') id: string): string | NotFoundException {
    return this.roomService.deleteReservation(+id);
  }

  // modifier une reservation
  @Patch('/rooms/reservations/update/:id')
  updateReservation(
    @Param('id') id: string,
    @Body() reservation_details: { resDet: RoomeReservationDetails },
  ): string | NotFoundException {
    const { resDet } = reservation_details;
    return this.roomService.updateReservation(+id, resDet);
  }
}
