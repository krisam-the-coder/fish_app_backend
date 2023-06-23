import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as FarmerService from "./farmer.service"

export const FarmerRouter = express.Router()


FarmerRouter.post('/', async (request: Request, response: Response) => {
    try {
        const Farmer = await FarmerService.createFarmer(request.body)
        return response.status(201).json(Farmer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }

})

FarmerRouter.get('/', async (request: Request, response: Response) => {

    try {
        const getFarmers = await FarmerService.getFarmers()
        return response.status(200).json(getFarmers)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


FarmerRouter.get('/:id',async(request:Request,response:Response)=>{

    const {id}=request.params
    try {
        const getFarmer = await FarmerService.getFarmer(id)
        return response.status(200).json(getFarmer)
    }  catch (error: any) {
        return response.status(500).json(error.message)
    }
})