import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 4040,
    username: "test",
    password: "test",
    database: "test_db",
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
})
