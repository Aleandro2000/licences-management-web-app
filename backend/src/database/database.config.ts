import { ConnectionOptions } from 'typeorm';

export const connectionOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "licences_degree",
    entities: [
        __dirname + "/../**/*.entity{.ts,.js}",
    ],
    synchronize: true,
}