import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { connectionOptions } from './config/database.config';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LicencesModule } from './licences/licences.module';
import { DiplomaModule } from './diploma/diploma.module';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (connectionOptions),
    }),
    UsersModule,
    LicencesModule,
    DiplomaModule,
    UniversitiesModule,
  ],
})
export class AppModule {}
