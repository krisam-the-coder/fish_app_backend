import express from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as UserService from "./user.service"


export const userRouter = express.Router();


// To Register A New User 

userRouter.post(
    '/register',
    [
        body('userName')
            .isString().withMessage("Username must be a string")
            .notEmpty().withMessage("Username should not be empty")
            .isLength({ min: 6 }).withMessage("Username should have a minimum of 6 characters."),

        body('phoneNumber')
            .isNumeric().withMessage("Phone number must be in numeric digits")
            .notEmpty().withMessage("Phone number should not be empty")
            .isLength({ min: 10, max: 10 }).withMessage("Phone number should have a minimum and maximum of 10 digits."),

        body('password')
            .isString().withMessage("Password must be a string")
            .notEmpty().withMessage("Password should not be empty")
            .isLength({ min: 6 }).withMessage("Password should have a minimum of 6 characters.")
    ],
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const registerUser = await UserService.createUser(request.body);
            return response.status(201).json(registerUser);
        } catch (error: any) {
            return response.status(500).json({ success: false, message: "Internal server error!" });
        }
    }
);


userRouter.post('/login', body("phoneNumber").isString().notEmpty(), body("password").isString().notEmpty(), async (request: Request, response: Response) => {

    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }

    try {
        const login = await UserService.login(request.body)
        return response.status(200).json(login)
    } catch (error: any) {
        return response.status(500).json({ success: false, message: "Internal server error!" });
    }
})


userRouter.post('/get-otp', body("phoneNumber").isString(), async (request: Request, response: Response) => {

    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }

    try {
        const getOtp = await UserService.otpSender(request.body.phoneNumber)
        return response.status(200).json(getOtp)
    } catch (error: any) {
        return response.status(500).json({ success: false, message: "Internal server error!" });
    }
})


userRouter.post('/verify-code', body("code").isString(), body("userId").isString(), async (request: Request, response: Response) => {

    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }

    try {
        const getVerify = await UserService.otpVerify(request.body)
        return response.status(200).json(getVerify)
    } catch (error: any) {
        return response.status(500).json({ success: false, message: "Internal server error!" });
    }
})


userRouter.patch('/reset-password', body("password").isString(), body("id").isString(), async (request: Request, response: Response) => {

    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }

    try {
        const passwordReset = await UserService.passwordReset(request.body)
        return response.status(200).json(passwordReset)
    } catch (error: any) {
        return response.status(500).json({ success: false, message: "Internal server error!" });
    }
})



