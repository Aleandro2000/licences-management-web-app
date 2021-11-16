import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { configuration } from './jwt.config';

@Injectable()
export class JwtAuthGuard extends AuthGuard(configuration.secret) { }