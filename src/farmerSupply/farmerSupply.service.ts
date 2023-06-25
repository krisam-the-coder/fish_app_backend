import { db } from "../utils/db.server"


type FarmerSupply = {
  fishType     : string,
  avgFishWeight: number,
    totalWeight: number,
  yieldDate    : Date,
    farmerId:string,
};



export const createFarmerSupply = async (data:any): Promise<FarmerSupply> => {
    const {fishType,avgFishWeight,totalWeight,yieldDate,farmerId}=data;
    
    return db.farmerSupply.create({
        data:{
            fishType, avgFishWeight, totalWeight, yieldDate: new Date(yieldDate), farmerId
        }
    })
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

export const getFarmerSupply = async (id: string): Promise<FarmerSupply | null> => {
    const getFarmerSupply =await db.farmerSupply.findUnique({
     where:{
        id
     },

    })
    return getFarmerSupply;
   
}