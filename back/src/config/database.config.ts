import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectOpts } from 'net';
import { ConnectionOptions } from 'typeorm';

export const connectionOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "LICENCES_DEGREE",
    entities: [
        __dirname + "/../**/*.entity{.ts,.js}",
    ],
    synchronize: true,
}