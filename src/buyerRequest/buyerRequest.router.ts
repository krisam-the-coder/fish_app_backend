import express, { query, request } from "express"
import { Request, Response } from "express"

import * as buyerRequest from "./buyerRequest.service"

export const buyerRequestRouter = express.Router()



buyerRequestRouter.post("/", async(request:Request,response:Response)=>{
    try{
        const createBuyerRequest=await buyerRequest.createBuyerRequest(request.body)
        return response.status(200).json(createBuyerRequest)
    }
    catch(error:any){
        return response.status(500).json(error.message)
    }
})


// to get all buyer requests of a farmerSupply
buyerRequestRouter.get("/:id", async(request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getBuyerRequests = await buyerRequest.getBuyerRequests(id)
        return response.status(200).json(getBuyerRequests)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to set approved:true buyer requests of a farmerSupply

buyerRequestRouter.patch("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const approveBuyerRequests = await buyerRequest.approveBuyerRequests(id)
        return response.status(200).json(approveBuyerRequests)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to reject the buyer requests
buyerRequestRouter.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleteBuyerRequests = await buyerRequest.deleteBuyerRequests(id)
        return response.status(200).json(deleteBuyerRequests)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})