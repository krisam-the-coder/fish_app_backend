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
  messaage: String
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

  return { success: true, messaage: "Farmer issue created successfully!" }
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
  return { success: true, messaage: "Buyer issue created successfully!" }
}


export const deleteIssue = async (id:string): Promise<string> => {
  const deleteIssue=await db.issues.delete({
    where:{
      id
    }
  })
return (" Your issue is deleted successfully! ")

}


export const updateIssue = async (id:string,data:any): Promise<string> => {
  const {issue}=data;
  const updateIssue =await db.issues.update({
    where:{
      id
    },
    data:{
      issue
    }
  })
return (" Your issue is updated successfully! ")
}