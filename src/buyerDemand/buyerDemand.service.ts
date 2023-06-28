import { db } from "../utils/db.server"


type BuyerDemand ={
  buyerId   :   string ,
  fishType   :   string,
  avgFishWeight :number,
    totalWeight: number,
  deadline    :  Date, 
}


export const createBuyerDemand = async (data: any): Promise<BuyerDemand> => {
    const { buyerId, fishType, avgFishWeight, totalWeight, deadline } = data;

    return db.buyerDemand.create({
        data: {
            buyerId, fishType, avgFishWeight, totalWeight, deadline:new Date(deadline)
        }
    })
}

export const deleteBuyerDemand = async (id: string): Promise<string> => {

    const deleteDemand = await db.buyerDemand.delete({
        where: {
            id
        }
    })
    if (deleteDemand) {
        return (" Your buyer demand is deleted successfully.")
    }
    else {
        return (" Your buyer demand is not deleted")
    }

}


export const updateBuyerDemand = async (data: any, id: string): Promise<BuyerDemand> => {
    const { buyerId, fishType, avgFishWeight, totalWeight, deadline } = data;
    const updateFarmerSupply = await db.buyerDemand.update({
        where: {
            id
        },
        data: {
            buyerId, fishType, avgFishWeight, totalWeight, deadline: new Date(deadline)
        }
    })
    return updateFarmerSupply;

}

export const getBuyerDemand = async (id: string): Promise<BuyerDemand[] | null> => {
    const getBuyerDemand = await db.buyerDemand.findMany({
        where: {
           buyerId: id
        },

    })
    return getBuyerDemand;

}

export const getBuyerDemands = async (): Promise<BuyerDemand[] | null> => {
    const getBuyerDemands = await db.buyerDemand.findMany({
    })
    return getBuyerDemands;
}