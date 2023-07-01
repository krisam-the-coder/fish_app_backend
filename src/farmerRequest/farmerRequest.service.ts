import { db } from "../utils/db.server"


type FarmerRequest = {
    buyerDemandId: string,
    farmerId: string,
    isApproved: boolean,
    supplyWeight: number,
    phoneNumber: string

};

type Success = {
    success: boolean,
    messaage: String
}


export const createFarmerRequest = async (data: FarmerRequest): Promise<Success> => {
    const { buyerDemandId, phoneNumber, farmerId, supplyWeight } = data;
    

    const createFarmerRequest = await db.farmerRequest.create({
        data: {
            buyerDemandId, isApproved: false, phoneNumber, farmerId, supplyWeight
        }
    })
    if(createFarmerRequest){
        return {success:true,messaage:"Farmer request created successfully!"}
    }
    else{
        return { success: false, messaage: "Farmer request was not created!" }   
    }
}

export const getFarmerRequests = async (id: string): Promise<FarmerRequest[]|null> => {

    const isBuyerDemand = await db.buyerDemand.findUnique({
        where: {
            id
        }
    })

    if(isBuyerDemand){
            const getFarmerRequests = await db.farmerRequest.findMany({
        where: {
            buyerDemandId: id
        }
    })
    return getFarmerRequests
    }
    else{
        return isBuyerDemand
    }

}


export const approveFarmerRequests = async (id: string): Promise<FarmerRequest|null> => {

const isFarmerRequest=await db.farmerRequest.findUnique({
    where:{id}
})
    if (isFarmerRequest){
            const approveFarmerRequests = await db.farmerRequest.update({
        where: {
            id
        },
        data: {
            isApproved: true,
        },
    });

    return approveFarmerRequests;
    }
    else{
        return isFarmerRequest
    }

}


export const deleteFarmerRequests = async (id: string): Promise<String|null> => {
    const isFarmerRequest = await db.farmerRequest.findUnique({
        where: { id }
    })
    if (isFarmerRequest) {
    const deleteFarmerRequests = await db.farmerRequest.delete({
        where: {
            id
        }
    })
    return "Farmer Request rejected successfully!";
}
else{
    return isFarmerRequest
}
}

