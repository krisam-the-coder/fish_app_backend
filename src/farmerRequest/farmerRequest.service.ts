import { db } from "../utils/db.server"


type FarmerRequest = {
    buyerDemandId :string, 
    farmerId: string, 
  isApproved  :  boolean,
  supplyWeight :string,
    phoneNumber: number

};


export const createFarmerRequest = async (data: FarmerRequest): Promise<FarmerRequest> => {
    const { buyerDemandId, phoneNumber, farmerId, supplyWeight } = data;
    const createFarmerRequest = await db.farmerRequest.create({
        data: {
            buyerDemandId, isApproved: false, phoneNumber, farmerId, supplyWeight
        }
    })
    return createFarmerRequest
}

export const getFarmerRequests = async (id: string): Promise<FarmerRequest[]> => {

    const getFarmerRequests = await db.farmerRequest.findMany({
        where: {
            buyerDemandId: id
        }
    })
    return getFarmerRequests
}


export const approveFarmerRequests = async (id: string): Promise<FarmerRequest> => {

    const approveFarmerRequests = await db.farmerRequest.update({
        where: {
            buyerDemandId: id
        },
        data: {
            isApproved: true
        }
    })
    return approveFarmerRequests;
}


export const deleteFarmerRequests = async (id: string): Promise<FarmerRequest> => {

    const deleteFarmerRequests = await db.farmerRequest.delete({
        where: {
            buyerDemandId: id
        }
    })
    return deleteFarmerRequests;
}

