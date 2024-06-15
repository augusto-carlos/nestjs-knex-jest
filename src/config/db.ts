// implement a knex connection with sqlite3
import { Injectable } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class DBConfig {
  constructor() {
    this.migrate();
  }

  readonly connection = knex({
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite',
    },
    useNullAsDefault: true,
  });

  private readonly migrate = async () => {
    console.log('migrating database..');

    await this.connection.schema
      .hasTable('users')
      .then((exists) => {
        if (!exists) {
          return this.connection.schema.createTable('users', (table) => {
            table.uuid('id').primary().defaultTo(this.connection.fn.uuid());
            table.string('name');
            table.integer('age');
            table.timestamps({ defaultToNow: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
