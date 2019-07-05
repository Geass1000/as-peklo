import * as Nest from '@nestjs/common';
import { UserModel } from './user.model';

export const providers = [
  UserModel,
];

@Nest.Module({
  imports: [
  ],
  providers: [
    ...providers,
  ],
  exports: [
    ...providers,
  ],
})
export class UserModule {}
