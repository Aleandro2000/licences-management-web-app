import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () => await createConnection({
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
    }),
  },
];
