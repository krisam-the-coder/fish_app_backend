import { db } from "../utils/db.server"
import { hash, compare } from "bcryptjs"
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'

import * as dotenv from "dotenv"
dotenv.config()


const SECRET_KEY = process.env.SECRET_KEY
if (!SECRET_KEY) {
    throw new Error('Missing secret key');
}


type Success = {
    success: boolean,
    message: string
}


type User = {
    userName: string,
    password: string,
    phoneNumber: number,
}

type resetPassword = {
    id: string,
    password: string
}

type Session = {
    session_token: string
    id: string,
    userName: string
}

type otp = {
    code: string,
    userId: string,
    verified: boolean
}

type verfiycode = {
    code: string,
    userId: string
}

type success = {
    verified: boolean,
}

export const createUser = async (data: User): Promise<Success> => {
    const existingUser = await db.user.findUnique({ where: { userName: data.userName } });
    const existingNumber = await db.user.findUnique({ where: { phoneNumber: String(data.phoneNumber) } });
    const hashPassword = await hash(data.password, 12)

    if (existingUser) {
        return { success: false, message: 'Username Already exists' }
    }

    if (existingNumber) {
        return { success: false, message: 'Phone Number already exists' }
    }

    await db.user.create({
        data: {
            userName: data.userName,
            password: hashPassword,
            phoneNumber: String(data.phoneNumber)
        }
    })
    return { success: true, message: 'Account Created' }


}



export const login = async (data: User): Promise<Session | string> => {
    const { phoneNumber, password } = data;
    const userData = await db.user.findUnique({ where: { phoneNumber: String(phoneNumber) } });

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
        return "Incorect Phone Number"; // User not found
    }

};



export const otpSender = async (phoneNumber: string): Promise<otp | string> => {

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const isPhoneNumber = await db.user.findUnique({
        where: { phoneNumber }
    })

    if (!isPhoneNumber) {
        return "Please enter a valid number"
    }

    const isOtp = await db.otp.findUnique({
        where: { userId: isPhoneNumber.id }
    })




    if (!isOtp) {
        return db.otp.create({
            data: {
                userId: isPhoneNumber.id,
                code: otp,
                verified: false,
                phoneNumber
            },
            select: {
                code: true,
                verified: true,
                userId: true
            }
        })

    }

    const updateOtp = await db.otp.update({
        where: {
            userId: isPhoneNumber.id
        },
        data: {
            code: otp,
            verified: false,
        },
        select: {
            code: true,
            verified: true,
            userId: true
        }
    })


    return updateOtp



}


export const otpVerify = async (data: verfiycode): Promise<string | success> => {

    const { userId, code } = data
    const getOtp = await db.otp.findUnique({
        where: { userId }
    })


    if (!getOtp) {
        return "Failed to verify otp"
    }

    if (getOtp.code === code) {
        return db.otp.update({
            where: { userId },
            data: {
                verified: true
            },
            select: {
                verified: true
            }
        })


    }

    return { verified: false }


}



export const passwordReset = async (data: resetPassword): Promise<Session | string> => {

    const { id, password } = data
    const hashPassword = await hash(password, 12)


    const isOtp = await db.user.findUnique({
        where: { id },
        include: {
            Otp: { select: { verified: true } }
        }
    })

    if (!isOtp?.Otp?.verified) {
        return "Failed to reset password !"
    }

    const updatePassword = await db.user.update({
        where: { id },
        data: {
            password: hashPassword
        }
    })

    if (!updatePassword) {
        return "Failed to reset password !"
    }

    const token = jwt.sign({ userName: isOtp.userName }, SECRET_KEY);
    const sessionToken: Session = {
        session_token: token,
        id: isOtp.id,
        userName: isOtp.userName,
    };

    return sessionToken;
}

