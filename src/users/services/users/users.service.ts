import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DBConfig } from 'src/config/db';
import { PaginationQueryDto } from 'src/models/pagination.dto';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UsersService {
  db = this.dbConfig.connection;
  constructor(private dbConfig: DBConfig) {}

  getUsers(pagination?: PaginationQueryDto) {
    try {
      const { size = 10, page = 0 } = pagination;

      return this.db
        .select('*')
        .from('users')
        .limit(size)
        .offset(page * size)
        .orderBy('id', 'asc');
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number | string) {
    const user = await this.db
      .select('*')
      .from('users')
      .where('id', id)
      .first();

    if (!user) throw new NotFoundException('Utilizador não encontrado.');

    return user;
  }

  async addUser(data: UserModel) {
    const createdUser = await this.db
      .table('users')
      .insert(data)
      .returning('*');

    if (!createdUser) throw new BadRequestException('Utilizador não registado');

    return createdUser;
  }
}
