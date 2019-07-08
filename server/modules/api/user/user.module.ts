import * as Nest from '@nestjs/common';

import { UserModel } from './user.model';
import { UserController } from './user.controller';

export const providers = [
  UserModel,
];

@Nest.Module({
  imports: [
  ],
  controllers: [
    UserController,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    ...providers,
  ],
})
export class UserModule {}
