import { AppDataSource } from "./data-source"
import { UserEntity } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new UserEntity()
    user.login = "Timber2"
    user.password = "Saw"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user")

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(UserEntity)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
