import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users-clerk')
  findAll() {
    return this.userService.findAll();
  }

  @Post('/users-clerk/seed')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { population: { type: 'number', example: 10 } },
    },
  })
  seed(@Body() populationField: { population: number }) {
    return this.userService.seed(populationField.population);
  }

  @Get('/users-clerk/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete('/users-clerk/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete('/users-clerk')
  removeSeed() {
    return this.userService.removeSeed();
  }
}
