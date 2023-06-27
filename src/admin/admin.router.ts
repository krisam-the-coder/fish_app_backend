import express from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as adminService from "./admin.service"


export const adminRouter = express.Router();


adminRouter.post('/login', body("userName").isString(), body("password").isString(), async (request: Request, response: Response) => {

    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }

    try {
        const login = await adminService.login(request.body)
        return response.status(200).json(login)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})