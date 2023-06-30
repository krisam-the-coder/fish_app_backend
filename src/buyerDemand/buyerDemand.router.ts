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
        return response.status(500).json({success:false,message:"Internal server error"})
    }
})

// to get all the buyer demand 
buyerDemandRouter.get('/', async (request: Request, response: Response) => {
    const { date, location, fishType } = request.query;
    try {
        const getBuyerDemands = await buyerService.getBuyerDemands(date, location, fishType)
        if (getBuyerDemands?.length===0){
            return response.status(200).json({success:true,message:"No data avaible in the database."})   
        }
        return response.status(200).json(getBuyerDemands)

    } catch (error: any) {
        return response.status(500).json({ success: false, message: "Internal server error" })
    }
})


// to delete the buyer demand 
buyerDemandRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteBuyerDemand = await buyerService.deleteBuyerDemand(id)
        if (deleteBuyerDemand === null) {
  return response.status(203).json({success:false,message:`Buyer demand of id ${id } doesnot exits. `})
        }
        return response.status(203).json(deleteBuyerDemand)
      

    } catch (error: any) {
        return response.status(500).json({ success: false, message: "Internal server error" })
    }
})


// to get demand of a particular  buyer  
buyerDemandRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const getBuyerDemand = await buyerService.getBuyerDemand(id)

        if (getBuyerDemand.length === 0) {
            return response.status(404).json({ success: true, message: `There are no demands of buyer ${id}` });
        }
        return response.status(200).json(getBuyerDemand);

    } catch (error: any) {
        return response.status(500).json({ success: false, message: 'Internal server error' });
    }
})

//to update th demand
buyerDemandRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const updateBuyerDemand = await buyerService.updateBuyerDemand(request.body, id)
        if (updateBuyerDemand === null) {
            return response.status(201).json({ success: false, message: `Buyer demand of id ${id} doesnot exits.` })
        }
        return response.status(201).json(updateBuyerDemand)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


