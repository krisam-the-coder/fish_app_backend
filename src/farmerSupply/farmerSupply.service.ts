import { ParsedUrlQuery } from "querystring";
import { db } from "../utils/db.server"

type FarmerSupply = {
  fishType     : string,
  avgFishWeight: number,
    totalWeight: number,
  yieldDate    : Date,
    farmerId:string,
};

type Success = {
    success: boolean,
    messaage: String
}




export const createFarmerSupply = async (data: any): Promise<Success> => {
    const {fishType,avgFishWeight,totalWeight,yieldDate,farmerId}=data;
    
    const createFarmerSupply=await  db.farmerSupply.create({
        data:{
            fishType, avgFishWeight, totalWeight, yieldDate: new Date(yieldDate), farmerId
        }
    })
    return { success: true, messaage: "Farmer supply created successfully!" }
}

export const deleteFarmerSupply = async (id:string): Promise<string> => {

   const deleteSupply=await db.farmerSupply.delete({
     where:{
        id
     }
    })
    if (deleteSupply){
         return (" Your farmer Supply is deleted successfully.")
    }
    else{
        return (" Your farmer Supply is not deleted")
    }
   
}


export const updateFarmerSupply = async (data:any,id: string): Promise<FarmerSupply> => {
    const { fishType, avgFishWeight, totalWeight, yieldDate, farmerId } = data;
    const updateFarmerSupply =await db.farmerSupply.update({
     where:{
        id
     },
     data:{
         fishType, avgFishWeight, totalWeight, yieldDate: new Date(yieldDate), farmerId 
     }
    })
 return updateFarmerSupply;
   
}

export const getFarmerSupplies = async (date:any, location: any, fishType: any): Promise<FarmerSupply[]> => {
    if(date !== undefined){
        let getFarmerSupplies;
        return   getFarmerSupplies = await db.farmerSupply.findMany({
            where:{
                yieldDate:new Date(date)
            }
        })
    }
    if (location !== undefined){
        let getFarmerSupplies;
        return   getFarmerSupplies = await db.farmerSupply.findMany({
            where:{
                farmer:{
                   location:{
                    district:location
                   } 
                }
            }
        })
    }
    if (fishType !== undefined){
        console.log(fishType)
        let getFarmerSupplies;
        return   getFarmerSupplies = await db.farmerSupply.findMany({
            where:{
             fishType:fishType
            }
        })
    }
    const getFarmerSupplies =await db.farmerSupply.findMany({
    })
    return getFarmerSupplies;
}




export const getFarmerSupply= async (id:string): Promise<FarmerSupply[] | null> => {
    const getFarmerSupply =await db.farmerSupply.findMany({
        where:{
            farmerId:id
        }
    })
    return getFarmerSupply;
}
