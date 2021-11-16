import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { configuration } from './jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter(configuration.secret),
      secretOrKeyProvider: (request, jwtToken, done) => {
        const decodedToken: any = jwt.decode(jwtToken);
        const user = this.usersService.getUser(decodedToken.id);
        done(null, user);
      },
    });
  }

  async validate(payload) {
    return await this.userService.getUser(payload.id);
  }
}