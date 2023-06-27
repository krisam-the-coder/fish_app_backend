import express, { request } from "express"
import { Request, Response } from "express"

import * as buyerService from "./buyerDemand.service"

export const buyerDemandRouter = express.Router()


// to create a farmer supply
buyerDemandRouter.post('/', async (request: Request, response: Response) => {
    try {
        const buyerDemand = await buyerService.createBuyerDemand(request.body)
        return response.status(201).json(buyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to get all the farmer supply
buyerDemandRouter.get('/', async (request: Request, response: Response) => {
    try {
        const getBuyerDemands = await buyerService.getBuyerDemands()
        return response.status(201).json(getBuyerDemands)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to delete the farmer supply
buyerDemandRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteBuyerDemand = await buyerService.deleteBuyerDemand(id)
        return response.status(201).json(deleteBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get supplies of a particular farmer
buyerDemandRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getBuyerDemand = await buyerService.getBuyerDemand(id)
        return response.status(201).json(getBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//to update th farmer supply
buyerDemandRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const updateBuyerDemand = await buyerService.updateBuyerDemand(request.body, id)
        return response.status(201).json(updateBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


