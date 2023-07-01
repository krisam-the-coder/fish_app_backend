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
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// to get all buyer requests of a farmerSupply
buyerRequestRouter.get("/:id", async(request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getBuyerRequests = await buyerRequest.getBuyerRequests(id)
        if(getBuyerRequests===null){
            return response.status(404).json({success:false,messaage:`Farmer Supply of id ${id} doesn't exist.`})   
        }
        return response.status(200).json(getBuyerRequests)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// to set approved:true buyer requests of a farmerSupply

buyerRequestRouter.patch("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const approveBuyerRequests = await buyerRequest.approveBuyerRequests(id)
        if(approveBuyerRequests===null){
            return response.status(200).json({ success: false, messaage: `Buyer Requuest of id ${id} doesn't exist.` })    
        }
        return response.status(200).json(approveBuyerRequests)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// to reject the buyer requests
buyerRequestRouter.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleteBuyerRequests = await buyerRequest.deleteBuyerRequests(id)
        if(deleteBuyerRequests===null){
            return response.status(200).json({success:false,message:`Buyer request of id ${id} doesn't exist.`})    
        }
        return response.status(200).json(deleteBuyerRequests)
    }
    catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' })
    }
})