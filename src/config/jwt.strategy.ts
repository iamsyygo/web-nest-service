import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getYmlByKey } from './yaml';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getYmlByKey('jwt').secret,
    });
  }

  // 此方法在令牌验证后调用,passeport自动解码JWT并将其作为参数传递给此方法
  async validate(payload: any) {
    return payload;
  }
}
