import express, { query, request } from "express"
import { Request, Response } from "express"

import * as farmerRequest from "./farmerRequest.service"

export const farmerRequestRouter = express.Router()

// to create a Farmer Request
farmerRequestRouter.post("/", async (request: Request, response: Response) => {
    try {
        const createFarmerRequest = await farmerRequest.createFarmerRequest(request.body)
        return response.status(200).json(createFarmerRequest)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// to get all farmer requests of a buyerDemand
farmerRequestRouter.get("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getFarmerRequests = await farmerRequest.getFarmerRequests(id)
        if(getFarmerRequests===null){
            return response.status(404).json({success:false,message:`Buyer demand of ID ${id} was not found!`})  
        }
        return response.status(200).json(getFarmerRequests)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// to set approved:true farmer requests of a buyerDemand

farmerRequestRouter.patch("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const approveFarmerRequests = await farmerRequest.approveFarmerRequests(id)
        if(approveFarmerRequests===null){
            return response.status(404).json({success:false,message:`farmer Request of ID ${id} was not found!`})
        }
        return response.status(200).json(approveFarmerRequests)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// to reject the farmer request
farmerRequestRouter.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleteFarmerRequests = await farmerRequest.deleteFarmerRequests(id)
        if (deleteFarmerRequests === null) {
            return response.status(404).json({ success: false, message: `farmer Request of ID ${id} was not found!` })
        }
        return response.status(200).json(deleteFarmerRequests)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})