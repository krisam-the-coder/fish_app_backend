import { db } from "../utils/db.server"
import { hash, compare } from "bcryptjs"
import jwt from 'jsonwebtoken'


import * as dotenv from "dotenv"
dotenv.config()


const SECRET_KEY = process.env.SECRET_KEY
if (!SECRET_KEY) {
    throw new Error('Missing secret key');
}









type admin = {
    password: string,
    userName: string,
}


type Session = {
    session_token: string
    id: string,
    userName: string
}









export const login = async (data: admin): Promise<Session | string> => {
    const { userName, password } = data;
    const userData = await db.admin.findUnique({ where: { userName } });

    if (userData) {
        const isPasswordValid = await compare(password, userData.password);

        if (!isPasswordValid) {
            return "Invalid Password!";
        }

        const token = jwt.sign({ userName: userData.userName }, SECRET_KEY);
        const sessionToken: Session = {
            session_token: token,
            id: userData.id,
            userName: userData.userName
        };

        return sessionToken;
    } else {
        return "Incorect User Name"; // User not found
    }

};

