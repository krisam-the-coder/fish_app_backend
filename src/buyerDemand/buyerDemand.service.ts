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
    message: string
}


export const createBuyerDemand = async (data: any): Promise<Success> => {
    const { buyerId, fishType, avgFishWeight, totalWeight, deadline } = data;

    const createBuyerDemand=await db.buyerDemand.create({
        data: {
            buyerId, fishType, avgFishWeight, totalWeight, deadline:new Date(deadline)
        }
    })
    if(createBuyerDemand){ return { success: true, message: "Buyer demand is successfully created!" }}
    else{
        return { success: false, message: "An error occured while creating the buyer demand!" }

    }
   
}

export const deleteBuyerDemand = async (id: string): Promise<Success| null> => {

    const isBuyerDemand=await db.buyerDemand.findUnique({
        where:{
            id
        }
    })
    if (isBuyerDemand){
   const deleteDemand = await db.buyerDemand.delete({
        where: {
            id
        }
    })
  return ({success:true,message:" Your buyer demand is deleted successfully."})
    }     
    return isBuyerDemand
}


export const updateBuyerDemand = async (data: any, id: string): Promise<Success |null> => {
    const { buyerId, fishType, avgFishWeight, totalWeight, deadline } = data;

    const isBuyerDemand = await db.buyerDemand.findUnique({
        where: {
            id
        }
    })
    if (isBuyerDemand){
           const updateFarmerSupply = await db.buyerDemand.update({
        where: {
            id
        },
        data: {
            buyerId, fishType, avgFishWeight, totalWeight, deadline: new Date(deadline)
        }
    })  
     return ({success:true,message:"Your buyerDemand is updated successfully."});
    }
    return isBuyerDemand
}

export const getBuyerDemand = async (id: string): Promise<BuyerDemand[]> => {
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