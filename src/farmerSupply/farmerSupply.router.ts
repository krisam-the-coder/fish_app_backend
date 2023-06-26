import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as FarmerService from "./farmerSupply.service"

export const farmerSupplyRouter = express.Router()


// to create a farmer supply
farmerSupplyRouter.post('/', async (request: Request, response: Response) => {
    try {
        const farmerSupply = await FarmerService.createFarmerSupply(request.body)
        return response.status(201).json(farmerSupply)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to delete the farmer supply
farmerSupplyRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteFarmerSupply = await FarmerService.deleteFarmerSupply(id)
        return response.status(201).json(deleteFarmerSupply)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get supplies of a particular farmer
farmerSupplyRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getFarmerSupply = await FarmerService.getFarmerSupply(id)
        return response.status(201).json(getFarmerSupply)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//to update th farmer supply
farmerSupplyRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const updateFarmerSupply = await FarmerService.updateFarmerSupply(request.body,id)
        return response.status(201).json(updateFarmerSupply)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get all the farmer supply
farmerSupplyRouter.get('/', async (request: Request, response: Response) => {
    try {
        const getFarmerSupplies = await FarmerService.getFarmerSupplies()
        return response.status(201).json(getFarmerSupplies)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

