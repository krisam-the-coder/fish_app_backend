import { db } from "../utils/db.server"


type BuyerRequest = {
  farmerSupplyId: string,
  buyerId: string,
  requestWeight: number,
};

type Success = {
  success: boolean,
  message: string
}



export const createBuyerRequest = async (data: any): Promise<Success>=>{
  const { farmerSupplyId, phoneNumber, buyerId, requestWeight }=data;
const   createBuyerRequest=await db.buyerRequest.create({
    data:{
      farmerSupplyId, isApproved: false, phoneNumber, buyerId, requestWeight
    }
  })
  if(createBuyerRequest)return{ success: true, message: "Buyer request is successfully created!" }
  else{
    return { success: false, message: "Buyer request is not created!" }
  }
}

export const getBuyerRequests = async (id: string): Promise<BuyerRequest[] |null> => {


const isFarmerSupply=await db.farmerSupply.findUnique({
  where:{
    id
  }
})

if(isFarmerSupply){
  const getBuyerRequests = await db.buyerRequest.findMany({
    where: {
      farmerSupplyId: id
    }
  })
  return getBuyerRequests
}
else{
  return isFarmerSupply;
}
}



export const approveBuyerRequests =async (id:string):Promise<BuyerRequest|null>=>{

  const isBuyerRequest = await db.buyerRequest.findUnique({
    where: {
       id
    }
  })
  if(isBuyerRequest){
      const approveBuyerRequests=await  db.buyerRequest.update({ 
    where:{
   id
    },
    data: {
      isApproved: true
    }
  })
  return approveBuyerRequests;
}
return isBuyerRequest;
  }



export const deleteBuyerRequests =async (id:string):Promise<Success |null>=>{
  const isBuyerRequest = await db.buyerRequest.findUnique({
    where: {
      id
    }
  })
  if(isBuyerRequest){
  const deleteBuyerRequests =await  db.buyerRequest.delete({ 
    where:{
      buyerId:id
    }
  })
 return {success:true,message:"Your buyer request is successfully deleted."};
  }
  return isBuyerRequest;

 
}

