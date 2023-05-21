import { JwtModule } from '@nestjs/jwt';
import { getYmlByKey } from './yaml';

const jwt = getYmlByKey('jwt') || {};

export const jwtModule = JwtModule.register({
  secret: jwt.secret,
  signOptions: { expiresIn: jwt.expiresIn },
});
