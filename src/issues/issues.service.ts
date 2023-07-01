import { db } from "../utils/db.server"

type farmerIssue={
  id: string;
  farmerId: string | null;
  buyerId: string | null;
  issue: string;
  farmer: {
    profilePicture: string;
    user: {
      userName: string;
    };
  } | null;
}
type buyerIssue={
  id: string;
  farmerId: string | null;
  buyerId: string | null;
  issue: string;
  buyer: {
    profilePicture: string;
    user: {
      userName: string;
    };
  } | null;
}

type Success = {
  success: boolean,
  message: String
}


export const createFarmerIssue = async (data: any): Promise<Success> => {
  const { farmerId, issue } = data;

  const farmerIssue = await db.issues.create({
    data: {
      farmerId: farmerId,
      issue: issue
    },
    include: {
      farmer: {
        select: {
          profilePicture: true,
          user: {
            select: {
              userName: true
            }
          }
        }
      }
    }
  });
if(farmerIssue){
    return { success: true, message: "Farmer issue created successfully!" }
}
else{
  return { success: false, message: "Farmer issue was not created successfully!" }
}

}

export const createBuyerIssue = async (data: any): Promise<Success> => {
  const { buyerId, issue } = data;

  const buyerIssue = await db.issues.create({
    data: {
      buyerId: buyerId,
      issue: issue
    },
    include: {
      buyer: {
        select: {
          profilePicture: true,
          user: {
            select: {
              userName: true
            }
          }
        }
      }
    }
  })
  if (buyerIssue) {
    return { success: true, message: "Buyer issue created successfully!" }
  }
  else {
    return { success: false, message: "Buyer issue was not created successfully!" }
  }
}


export const deleteIssue = async (id:string): Promise<Success|null> => {
  const isIssue = await db.issues.findUnique({
    where: { id }
  })
  if(isIssue){
    const deleteIssue=await db.issues.delete({
    where:{
      id
    }
  })
    return ({ success: true, message: " Your issue is deleted successfully! " })
  }
  else {
    return isIssue

  }

}


export const updateIssue = async (id:string,data:any): Promise<Success|null> => {
  const {issue}=data;

  const isIssue=await db.issues.findUnique({
    where:{id}
  })
  if (isIssue){
      const updateIssue =await db.issues.update({
    where:{
      id
    },
    data:{
      issue
    }
  })
return ( {success:true, message:" Your issue is updated successfully! "})
  }
  else{
return isIssue

  }

}