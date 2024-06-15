import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';

export const Public = () => {
  console.log('REQ/RES LIFE CYCLE -> DECORATORS');

  return SetMetadata(IS_PUBLIC, true);
};
