export interface UserModel extends DefaultFieldsModel {
  name: string;
  age: number;
}

interface DefaultFieldsModel {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
