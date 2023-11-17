import { userDao } from "../dao/index.js";

export class UserService{
    static createUser = (userInfo)=>{
        return userDao.createUser(userInfo);
    };
    static getUsers = ()=>{
        return userDao.getUsers();
    };
    static getUserByEmail = (userEmail)=>{
        return userDao.getUserByEmail(userEmail); 
    };
    static getUserById = (userId)=>{
        return userDao.getUserById(userId);
    }
}