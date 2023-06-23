import express from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as UserService from "./user.service"


export const userRouter = express.Router();


// To Register A New User 

userRouter.post('/register', body("userName").isString(), body("phoneNumber").isString(), body("password").isString(), async (request: Request, response: Response) => {
    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }
    try {
        const registerUser = await UserService.createUser(request.body)
        return response.status(201).json(registerUser)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

userRouter.post('/login', body("phoneNumber").isString(), body("password").isString(), async (request: Request, response: Response) => {

    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }

    try {
        const login = await UserService.login(request.body)
        return response.status(200).json(login)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})