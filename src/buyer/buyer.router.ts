import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as BuyerService from "./buyer.service"

export const BuyerRouter = express.Router()

// To create buyer Request
BuyerRouter.post('/request/', async (request: Request, response: Response) => {
    try {
        const Farmer = await BuyerService.createBuyerRequest(request.body)
        return response.status(201).json(Farmer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get all buyers
BuyerRouter.get('/', async (request: Request, response: Response) => {

    try {
        const getBuyers = await BuyerService.getBuyers()
        return response.status(200).json(getBuyers)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})
// to get all buyers Requests
BuyerRouter.get('/request', async (request: Request, response: Response) => {

    try {
        const getBuyerRequests = await BuyerService.getBuyerRequests()
        return response.status(200).json(getBuyerRequests)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//For single buyer
BuyerRouter.get('/:id',async(request:Request,response:Response)=>{

    const {id}=request.params
    try {
        const getFarmer = await BuyerService.getBuyer(id)
        return response.status(200).json(getFarmer)
    }  catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//For single buyer Request
BuyerRouter.get('/request/:id',async(request:Request,response:Response)=>{

    const {id}=request.params
    try {
        const getSingleBuyerRequest = await BuyerService.getSingleBuyerRequest(id)
        return response.status(200).json(getSingleBuyerRequest)
    }  catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//To reject any buyer
BuyerRouter.delete("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const rejectBuyerRequest=await BuyerService.rejectBuyerRequest(id)
        return response.status(200).json(rejectBuyerRequest)
    }catch(error:any){
        return response.status(500).json(error.message)
    }
})

// to accept buyer request
BuyerRouter.patch("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const acceptBuyerRequest=await BuyerService.acceptBuyerRequest(id)
        return response.status(200).json(acceptBuyerRequest)
    }catch(error:any){
        return response.status(500).json(error.message)
    }
})


//to inactive any buyer

BuyerRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const inActivateBuyer = await BuyerService.inActivateBuyer(id)
        return response.status(200).json(inActivateBuyer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})



