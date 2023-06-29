import { db } from "../utils/db.server"


type BuyerRequest = {
  farmerSupplyId :string ,
  buyerId      :  string ,
  requestWeight:number,
  phoneNumber: string

};


export const createBuyerRequest =async (data:any):Promise<BuyerRequest>=>{
  const { farmerSupplyId, phoneNumber, buyerId, requestWeight }=data;
const   createBuyerRequest=await db.buyerRequest.create({
    data:{
      farmerSupplyId, isApproved: false, phoneNumber, buyerId, requestWeight
    }
  })
  return createBuyerRequest
}

export const getBuyerRequests =async (id:string):Promise<BuyerRequest[]>=>{
  
const  getBuyerRequests=await db.buyerRequest.findMany({ 
    where:{
      farmerSupplyId:id
    }
  })
  return getBuyerRequests
}


export const approveBuyerRequests =async (id:string):Promise<BuyerRequest>=>{
  
  const approveBuyerRequests=await  db.buyerRequest.update({ 
    where:{
   id
    },
    data:{
      isApproved:true
    }
  })
  return approveBuyerRequests;
}


export const deleteBuyerRequests =async (id:string):Promise<String>=>{
  
  const deleteBuyerRequests =await  db.buyerRequest.delete({ 
    where:{
      buyerId:id
    }
  })
  return "Buyer request deleted!";
}

