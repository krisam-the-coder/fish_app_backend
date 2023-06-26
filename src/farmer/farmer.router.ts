import express, { request } from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as FarmerService from "./farmer.service"

export const FarmerRouter = express.Router()

// To create farmer Request
FarmerRouter.post('/request/', async (request: Request, response: Response) => {
    try {
        const Farmer = await FarmerService.createFarmerRequest(request.body)
        return response.status(201).json(Farmer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// to get all farmers
FarmerRouter.get('/', async (request: Request, response: Response) => {

    try {
        const getFarmers = await FarmerService.getFarmers()
        return response.status(200).json(getFarmers)

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
FarmerRouter.get('/:id',async(request:Request,response:Response)=>{

    const {id}=request.params
    try {
        const getFarmer = await FarmerService.getFarmer(id)
        return response.status(200).json(getFarmer)
    }  catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//For single Farmer Request
FarmerRouter.get('/request/:id',async(request:Request,response:Response)=>{

    const {id}=request.params
    try {
        const getSingleFarmerRequest = await FarmerService.getSingleFarmerRequest(id)
        return response.status(200).json(getSingleFarmerRequest)
    }  catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//To reject any farmer
FarmerRouter.delete("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteFarmerRequest=await FarmerService.rejectFarmerRequest(id)
        return response.status(200).json(deleteFarmerRequest)
    }catch(error:any){
        return response.status(500).json(error.message)
    }
})

// to accept farmer request
FarmerRouter.patch("/request/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const acceptFarmerRequest=await FarmerService.acceptFarmerRequest(id)
        return response.status(200).json(acceptFarmerRequest)
    }catch(error:any){
        return response.status(500).json(error.message)
    }
})


//to inactive any farmer

FarmerRouter.patch('/:id', async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const inActivateFarmer = await FarmerService.inActivateFarmer(id)
        return response.status(200).json(inActivateFarmer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


//update farmers data

// FarmerRouter.patch('/', async (request: Request, response: Response) => {
//     const { id } = request.params
//     try {
//         const updateAnyDataOfFarmer = await FarmerService.updateAnyDataOfFarmer(request.body,id)
//         return response.status(200).json(updateAnyDataOfFarmer)

//     } catch (error: any) {
//         return response.status(500).json(error.message)
//     }
// })

