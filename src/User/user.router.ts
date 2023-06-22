import express from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as UserService from "./user.service"


export const userRouter = express.Router();


// To Register A New User 

userRouter.post('/register', async (request: Request, response: Response) => {

    try {
        const registerUser = await UserService.createUser(request.body)
        return response.status(200).json(registerUser)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

userRouter.post('/login', async (request: Request, response: Response) => {

    try {
        const logIN = await UserService.login(request.body)
        return response.status(200).json(logIN)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})