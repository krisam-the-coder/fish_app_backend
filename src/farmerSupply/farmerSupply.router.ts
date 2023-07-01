import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as FarmerService from "./farmerSupply.service"
import { getFarmer } from "../farmer/farmer.service"

export const farmerSupplyRouter = express.Router()


// to create a farmer supply
farmerSupplyRouter.post('/', async (request: Request, response: Response) => {
    try {
        const farmerSupply = await FarmerService.createFarmerSupply(request.body)
        return response.status(201).json(farmerSupply)

    } catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// to delete the farmer supply
farmerSupplyRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteFarmerSupply = await FarmerService.deleteFarmerSupply(id)
        if(deleteFarmerSupply===null){
            return response.status(201).json({success:false,message:`Farmer supply with ID ${id} was not found!`})     
        }
        return response.status(201).json(deleteFarmerSupply)

    } catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// to get supplies of a particular farmer
farmerSupplyRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getFarmerSupply = await FarmerService.getFarmerSupply(id)
        if(getFarmerSupply===null){
            return response.status(201).json({success:false,message:`Farmer of ID ${id} deost not exits.`})   
        }
        return response.status(201).json(getFarmerSupply)

    } catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})



//to update the farmer supply
farmerSupplyRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const updateFarmerSupply = await FarmerService.updateFarmerSupply(request.body,id)
        if(updateFarmerSupply===null){
            return response.status(201).json({ success: false, message: `Farmer Supply of ID ${id} deost not exits.` })     
        }
        return response.status(201).json(updateFarmerSupply)

    } catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// to get all the farmer supply
farmerSupplyRouter.get('/', async (request: Request, response: Response) => {
    const { date, location,fishType }  = request.query ;

    try {
        const getFarmerSupplies = await FarmerService.getFarmerSupplies(date, location, fishType)
        if(getFarmerSupplies.length===0){
            return response.status(201).json({success:true,message:"There are no farmer supplies."})      
        }
        return response.status(201).json(getFarmerSupplies)

    } catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})



