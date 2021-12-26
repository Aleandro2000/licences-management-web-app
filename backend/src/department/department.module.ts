import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';
import { configuration } from '../jwt/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  controllers: [DepartmentController],
  providers: [DepartmentService, JwtStrategy, JwtAuthGuard]
})
export class DepartmentModule { }
