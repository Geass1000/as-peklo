import * as Nest from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Nest.Injectable()
export class JWTGuard extends AuthGuard('jwt') {
}
