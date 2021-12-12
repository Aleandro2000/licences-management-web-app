import { ConnectionOptions } from 'typeorm'

export const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'licences_degree',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}'
  ]
}
