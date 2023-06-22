import { db } from "../utils/db.server"
import { hash, compare } from "bcryptjs"
import jwt from 'jsonwebtoken'

import * as dotenv from "dotenv"
dotenv.config()


const SECRET_KEY = process.env.SECRET_KEY
if (!SECRET_KEY) {
    throw new Error('Missing secret key');
}



type User = {
    userName: string,
    password: string,
    phoneNumber: string,
}

type Session = {
    session_token: string
    id: string,
    userName: string
}


export const createUser = async (data: User): Promise<string | null> => {
    const existingUser = await db.user.findUnique({ where: { userName: data.userName } });
    const existingNumber = await db.user.findUnique({ where: { phoneNumber: data.phoneNumber } });
    const hashPassword = await hash(data.password, 12)



    if (existingUser) {
        return "Username already exists";
    }

    if (existingNumber) {
        return "Phone Number already exists";
    }
    const register = await db.user.create({
        data: {
            userName: data.userName,
            password: hashPassword,
            phoneNumber: data.phoneNumber
        }
    })

    if (register) {
        return "Account has been Created Successfully"
    }

    return null
}



export const login = async (data: User): Promise<Session | null | string> => {
    try {
        const { phoneNumber, password } = data;
        const userData = await db.user.findUnique({ where: { phoneNumber } });

        if (userData) {
            const isPasswordValid = await compare(password, userData.password);

            if (!isPasswordValid) {
                return "Invalid Password!";
            }

            const token = jwt.sign({ userName: userData.userName }, SECRET_KEY);
            const sessionToken: Session = {
                session_token: token,
                id: userData.id,
                userName: userData.userName,
            };

            return sessionToken;
        } else {
            return "Incorect Phone Number"; // User not found
        }
    } catch (error) {
        console.log(error);
        return "An error occurred"; // Handle any potential errors
    }
};