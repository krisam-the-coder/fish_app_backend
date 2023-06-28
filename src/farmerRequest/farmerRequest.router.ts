import express, { query, request } from "express"
import { Request, Response } from "express"

import * as farmerRequest from "./farmerRequest.service"

export const farmerRequestRouter = express.Router()

farmerRequestRouter.post("/", async (request: Request, response: Response) => {
    try {
        const createFarmerRequest = await farmerRequest.createFarmerRequest(request.body)
        return response.status(200).json(createFarmerRequest)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get all farmer requests of a buyerDemand
farmerRequestRouter.get("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getFarmerRequests = await farmerRequest.getFarmerRequests(id)
        return response.status(200).json(getFarmerRequests)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to set approved:true farmer requests of a buyerDemand

farmerRequestRouter.patch("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const approveFarmerRequests = await farmerRequest.approveFarmerRequests(id)
        return response.status(200).json(approveFarmerRequests)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to reject the farmer request
farmerRequestRouter.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleteFarmerRequests = await farmerRequest.deleteFarmerRequests(id)
        return response.status(200).json(deleteFarmerRequests)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})