import express, { query, request } from "express"
import { Request, Response } from "express"
import { body, param, validationResult } from "express-validator"

import * as issueService from "./issues.service"

export const issueRouter = express.Router()

// to create a farmer issue
issueRouter.post("/farmer",
    [
        body('farmerId').isString().notEmpty(),
        body('issue').isString().notEmpty(),
    ],
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        try {
            const farmerIssue = await issueService.createFarmerIssue(request.body)
            return response.status(201).json(farmerIssue)

        } catch (error: any) {
            return response.status(500).json(error.message)
        }
    })

    // to create a buyer issue
issueRouter.post("/buyer", async (request: Request, response: Response) => {
    try {
        const buyerIssue = await issueService.createBuyerIssue(request.body)
        return response.status(201).json(buyerIssue)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to delete an issue(farmer/buyer)
issueRouter.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const deleteIssue = await issueService.deleteIssue(id)
        return response.status(201).json(deleteIssue)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// to update an issue(farmer/buyer)
issueRouter.patch("/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const updateIssue = await issueService.updateIssue(id,request.body)
        return response.status(201).json(updateIssue)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

