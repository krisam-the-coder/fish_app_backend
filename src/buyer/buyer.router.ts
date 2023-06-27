import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as buyerService from "./buyer.service"

export const buyerRouter = express.Router()



// to get all buyers
buyerRouter.get('/', async (request: Request, response: Response) => {

    try {
        const getBuyers = await buyerService.getBuyers()
        return response.status(200).json(getBuyers)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})



// To create buyer Request
buyerRouter.post('/request/', async (request: Request, response: Response) => {
    try {
        const createBuyerRequest = await buyerService.createBuyerRequest(request.body)
        return response.status(201).json(createBuyerRequest)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})



//For single buyer
buyerRouter.get('/:id', async (request: Request, response: Response) => {

    const { id } = request.params
    try {
        const getBuyer = await buyerService.getBuyer(id)
        return response.status(200).json(getBuyer)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


//To reject any buyer
buyerRouter.delete("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteBuyerRequest = await buyerService.rejectBuyerRequest(id)
        return response.status(200).json(deleteBuyerRequest)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to get all buyer Requests
buyerRouter.get('/request', async (request: Request, response: Response) => {
    console.log("Hello")

    try {
        const getBuyerRequests = await buyerService.getBuyerRequests()
        return response.status(200).json(getBuyerRequests)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


//For single buyer Request
buyerRouter.get('/request/:id', async (request: Request, response: Response) => {

    const { id } = request.params
    try {
        const getSingleBuyerRequest = await buyerService.getSingleBuyerRequest(id)
        return response.status(200).json(getSingleBuyerRequest)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})



// to accept buyer request
buyerRouter.patch("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const acceptBuyerRequest = await buyerService.acceptBuyerRequest(id)
        return response.status(200).json(acceptBuyerRequest)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


//to inactive any buyer

buyerRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const inActivateBuyer = await buyerService.inActivateBuyer(id)
        return response.status(200).json(inActivateBuyer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


