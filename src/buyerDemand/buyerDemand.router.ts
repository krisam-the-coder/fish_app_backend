import express, { request } from "express"
import { Request, Response } from "express"

import * as buyerService from "./buyerDemand.service"

export const buyerDemandRouter = express.Router()


// to create a buyer demand 
buyerDemandRouter.post('/', async (request: Request, response: Response) => {
    try {
        const buyerDemand = await buyerService.createBuyerDemand(request.body)
        return response.status(201).json(buyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to get all the buyer demand 
buyerDemandRouter.get('/', async (request: Request, response: Response) => {
    const { date, location, fishType } = request.query;
    try {
        const getBuyerDemands = await buyerService.getBuyerDemands(date, location, fishType)
        return response.status(201).json(getBuyerDemands)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to delete the buyer demand 
buyerDemandRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteBuyerDemand = await buyerService.deleteBuyerDemand(id)
        return response.status(201).json(deleteBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get demand of a particular  buyer  
buyerDemandRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getBuyerDemand = await buyerService.getBuyerDemand(id)
        return response.status(201).json(getBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//to update th demand
buyerDemandRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const updateBuyerDemand = await buyerService.updateBuyerDemand(request.body, id)
        return response.status(201).json(updateBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


