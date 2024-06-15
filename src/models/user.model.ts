import { UUID } from 'crypto';

export interface UserModel extends DefaultFieldsModel {
  name: string;
  age: number;
}

interface DefaultFieldsModel {
  id?: UUID;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
