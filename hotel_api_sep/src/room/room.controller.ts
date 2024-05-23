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
import { RoomReservationDetails, stats } from './dto/room.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/stats')
  async stats(): Promise<stats> {
    const globalStat = await this.roomService.stats();
    return globalStat;
  }
  // toute les chambres
  @Get('/rooms')
  findAllRooms(): Room[] {
    return this.roomService.findAllRooms();
  }

  @Post('/rooms')
  createRoom(@Body() room: { roomJSON: Partial<Room> }): Room {
    const { roomJSON } = room;
    return this.roomService.createRoom(roomJSON);
  }

  @Delete('/rooms/delete')
  deleteAllRooms(): string {
    return this.roomService.deleteAllRooms();
  }

  // detail d'une chambre
  @Get('/rooms/:id')
  findRoomById(@Param('id') id: string): Room {
    return this.roomService.findRoomById(+id);
  }

  @Delete('/room/:id')
  deleteRoom(@Param('id') id: string): string | NotFoundException {
    return this.roomService.deleteRoom(+id);
  }

  @Post('/rooms/populate')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { population: { type: 'number', example: 10 } },
    },
  })
  populateRooms(@Body() populationField: { population: number }): Room[] {
    return this.roomService.populateRooms(populationField.population);
  }

  @Post('/rooms/populate/reservations')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { population: { type: 'number', example: 10 } },
    },
  })
  populateRoomsWithReservations(
    @Body() populationField: { population: number },
  ) {
    return this.roomService.populateRoomsWithReservations(
      populationField.population,
    );
  }

  // detail d'une reservation
  @Get('/rooms/reservations/:id')
  findReservationById(
    @Param('id') id: string,
  ): RoomReservationDetails | string {
    return this.roomService.findReservationDetailById(+id);
  }

  // reserver une chambre
  @Patch('/rooms/reserver/:id')
  reserveRoom(
    @Param('id') id: string,
    @Body() reservation_details: { resDet: RoomReservationDetails },
  ) {
    const { resDet } = reservation_details;
    return this.roomService.reserveRoom(+id, resDet);
  }

  // modifier une reservation
  @Patch('/rooms/reservations/:id')
  updateReservation(
    @Param('id') id: string,
    @Body() reservation_details: { resDet: RoomReservationDetails },
  ): string | NotFoundException {
    const { resDet } = reservation_details;
    return this.roomService.updateReservation(+id, resDet);
  }

  // suppression d'une reservation
  @Delete('/rooms/reservations/:id')
  deleteReservation(@Param('id') id: string): string | NotFoundException {
    return this.roomService.deleteReservation(+id);
  }
}
