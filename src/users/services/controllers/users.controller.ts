import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/models/pagination.dto';
import { CreateUserDto } from 'src/models/user.dto';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query() pagination: PaginationQueryDto) {
    const users = this.usersService.getUsers(pagination);
    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id) {
    const user = this.usersService.getUserById(id);
    return user;
  }

  @Post()
  addUser(@Body() body: CreateUserDto) {
    const createdUser = this.usersService.addUser(body);
    return createdUser;
  }
}
