import { db } from "../utils/db.server"


type BuyerDemand ={
  buyerId   :   string ,
  fishType   :   string,
  avgFishWeight :number,
    totalWeight: number,
  deadline    :  Date, 
}

type Success = {
    success: boolean,
    messaage: String
}


export const createBuyerDemand = async (data: any): Promise<Success> => {
    const { buyerId, fishType, avgFishWeight, totalWeight, deadline } = data;

    const createBuyerDemand=await db.buyerDemand.create({
        data: {
            buyerId, fishType, avgFishWeight, totalWeight, deadline:new Date(deadline)
        }
    })
    return { success: true, messaage: "Buyer demand is successfully created!" }
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

export const getBuyerDemands = async (date: any, location: any, fishType: any): Promise<BuyerDemand[] | null> => {
    if (date !== undefined) {
        let getBuyerDemands;
        return getBuyerDemands = await db.buyerDemand.findMany({
            where: {
                yieldDate: new Date(date)
            }
        })
    }
    if (location !== undefined) {
        let getBuyerDemands;
        return getBuyerDemands = await db.buyerDemand.findMany({
            where: {
                Buyer: {
                    location: {
                        district: location
                    }
                }
            }
        })
    }
    if (fishType !== undefined) {

        let getBuyerDemands;
        return getBuyerDemands = await db.buyerDemand.findMany({
            where: {
                fishType: fishType
            }
        })
    }
    const getBuyerDemands = await db.buyerDemand.findMany({
    })
    return getBuyerDemands;
}