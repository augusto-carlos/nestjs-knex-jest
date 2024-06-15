import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/models/pagination.dto';
import { CreateUserDto } from 'src/models/user.dto';
import { UsersService } from '../services/users.service';
import { Public } from '@core/decorators';
import { ParseUUIDPipe } from '@core/pipes';
import { Protocol } from '@core/decorators/protocol.param-decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @Redirect('https://api.github.com/users/augusto-carlos/repos', 301)
  getUsers(
    @Query() pagination: PaginationQueryDto,
    @Protocol() protocol: string, // <- (custom decorator) getting the protocol from the request
  ) {
    console.log(protocol);

    const users = this.usersService.getUsers(pagination);
    return users;
  }

  @Public() // <- marked as a public endpoint, providing the isPublic key to true, that is verified on global guard
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.getUserById(id);
    return user;
  }

  @Post()
  addUser(@Body() body: CreateUserDto) {
    const createdUser = this.usersService.addUser(body);
    return createdUser;
  }
}
