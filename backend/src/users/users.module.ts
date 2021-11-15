import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "../jwt/jwt.strategy";
import { JwtAuthGuard } from "src/jwt/jwt.auth.guard";
import { configuration } from "../jwt/jwt.config";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configuration.secret,
        signOptions: { expiresIn: configuration.expiresIn }
      })
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, JwtAuthGuard]
})
export class UsersModule { }