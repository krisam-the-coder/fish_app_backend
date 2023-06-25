import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as buyerService from "./buyer.service"

export const buyerRouter = express.Router()

// To create buyer Request
buyerRouter.post('/request/', async (request: Request, response: Response) => {
    try {
        const buyer = await buyerService.createBuyer(request.body)
        return response.status(201).json(buyer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get all farmers
buyerRouter.get('/', async (request: Request, response: Response) => {

    try {
        const getBuyers = await buyerService.getBuyers()
        return response.status(200).json(getBuyers)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})
// to get all farmers Requests
FarmerRouter.get('/request', async (request: Request, response: Response) => {

    try {
        const getFarmerRequests = await FarmerService.getFarmerRequests()
        return response.status(200).json(getFarmerRequests)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//For single Farmer
FarmerRouter.get('/:id', async (request: Request, response: Response) => {

    const { id } = request.params
    try {
        const getFarmer = await FarmerService.getFarmer(id)
        return response.status(200).json(getFarmer)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//For single Farmer Request
FarmerRouter.get('/request/:id', async (request: Request, response: Response) => {

    const { id } = request.params
    try {
        const getSingleFarmerRequest = await FarmerService.getSingleFarmerRequest(id)
        return response.status(200).json(getSingleFarmerRequest)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//To reject any farmer
FarmerRouter.delete("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteFarmerRequest = await FarmerService.rejectFarmerRequest(id)
        return response.status(200).json(deleteFarmerRequest)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to accept farmer request
FarmerRouter.patch("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const acceptFarmerRequest = await FarmerService.acceptFarmerRequest(id)
        return response.status(200).json(acceptFarmerRequest)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


//to inactive any farmer

FarmerRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const inActiveFarmer = await FarmerService.inActivateFarmer(id)
        return response.status(200).json(inActiveFarmer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


