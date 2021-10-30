import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { connectionOptions } from './database/database.config';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LicencesModule } from './licences/licences.module';
import { DiplomaModule } from './diploma/diploma.module';
import { UniversitiesModule } from './universities/universities.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (connectionOptions),
    }),
    UsersModule,
    LicencesModule,
    DiplomaModule,
    UniversitiesModule,
    DepartmentModule,
  ],
})
export class AppModule {}