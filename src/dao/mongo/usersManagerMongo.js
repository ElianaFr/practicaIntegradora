import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo{

    constructor(){
        this.model = usersModel;
    }
    async getUsers () {
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
        console.log('getUsers:', error.message);
        throw new Error('Error al obtener usuarios.');
        }
    };
    async getUserByEmail (userEmail) {
        try {
            const user = await this.model.findOne({ email: userEmail }).lean();
            return user;
        } catch (error) {
            console.log('getUserByEmail:', error.message);
            throw new Error('Error al obtener datos del usuario.');
        }
    };
    async createUser (userInfo) {
        try {
            const userNew = await this.model.create(userInfo);
            return userNew;
        } catch (error) {
            console.log('createUser', error.message);
            throw new Error('Error al dar de alta al usuario');
        }
    };
}