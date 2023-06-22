import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as FarmerService from "./farmer.service"

export const FarmerRouter = express.Router()


FarmerRouter.post('/', async (request: Request, response: Response) => {
    const Farmer = await FarmerService.createFarmer(request.body)
    return response.status(200).json(Farmer)

})

FarmerRouter.get('/',async(request:Request,response:Response)=>{
    const getFarmers = await FarmerService.getFarmers()
    return response.status(200).json(getFarmers)
})