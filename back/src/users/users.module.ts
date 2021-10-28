import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "../jwt/jwt.strategy";
import { JwtAuthGuard } from "src/jwt/jwt.auth.guard";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "jwtsecrettoken",
        signOptions: {expiresIn: "1h"}
      })
    })
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy,JwtAuthGuard]
})
export class UsersModule {}