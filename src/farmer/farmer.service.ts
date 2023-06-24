import { db } from "../utils/db.server"


type Farmer = {
    userId: string;
    profilePicture: string;
    farmName: string;
    pondSize: number;
    active: boolean;
    approved: boolean;
};




export const getFarmers = async (): Promise<Farmer[]> => {

    return db.farmer.findMany({
        where:
            { active: true, approved: true },
        include: {
            location:
            {
                select:
                {
                    pradesh: true, district: true, mahaNagarpalika: true,
                    upaMahaNagarpalika: true, gaupalika: true,
                    nagarpalika: true
                }
            }
        }
    })
}

export const createFarmerRequest = async (data: any): Promise<Farmer | string> => {
    const {
        userId, farmName, profilePicture, pondSize, pradesh, district, nagarpalika,
        Woda
    } = data


    const Farmer = await db.farmer.create({
        data: {
            farmName, profilePicture, pondSize, active: false, approved: false, userId
        }
    })

    const Location = await db.location.create({
        data: {
            pradesh, district, nagarpalika, farmerId: Farmer.id, Woda
        }
    })

    if (Farmer && Location) {
        return "New Farmer request added Successfully"
    } else {
        return "Unable to create Farmer request"
    }
}

export const getFarmer = async (id: string): Promise<Farmer | null> => {

    const singleFarmer = db.farmer.findUnique(
        {
            where: { id },
            include: {
                location:
                {
                    select:
                    {
                        pradesh: true, district: true, mahaNagarpalika: true,
                        upaMahaNagarpalika: true, gaupalika: true,
                        nagarpalika: true
                    }
                }
            }
        }
    )
    return singleFarmer;
}

export const rejectFarmerRequest = async (id: string): Promise<string> => {
    try {
        const deleteFarmerRequest = await db.farmer.deleteMany({
            where: {
                id,
                AND: [
                    { approved: false },
                    { active: false }
                ]
            }
        });
        if (deleteFarmerRequest) {
            return "Farmer rejected successfully!";
        } else {
            return "Failed to reject farmer!";
        }
    } catch (error) {
        // Handle any potential errors that occur during the deletion process
        return "An error occurred while deleting the farmer.";
    }
};
export const acceptFarmerRequest = async (id: string): Promise<string> => {
    try {
        const acceptFarmerRequest = await db.farmer.update({
            where: {
                id,
            },
               data: {
                approved: true,
                active: true
            }


        });
        if (acceptFarmerRequest) {
            return "Farmer accepted successfully!";
        } else {
            return "Failed to accept farmer!";
        }
    } catch (error) {
        // Handle any potential errors that occur during the deletion process
        return "An error occurred while accepting the farmer.";
    }
};


export const inActivateFarmer = async (id: string): Promise< string> => {

    const inActivatedFarmer = await db.farmer.update({
        where: {
            id
        },
        data: {
            active: false
        }
    })

    return "Farmer inactivated successfully!";
}

export const getFarmerRequests = async (): Promise<Farmer[]> => {

    return db.farmer.findMany({
        where:
            { active: false, approved: false },
        include: {
            location:
            {
                select:
                {
                    pradesh: true, district: true, mahaNagarpalika: true,
                    upaMahaNagarpalika: true, gaupalika: true,
                    nagarpalika: true,Woda:true
                }
            }
        }
    })
}

//TO get single farmer request
export const getSingleFarmerRequest = async (id:string): Promise<Farmer|null> => {

  const singleFarmerRequest=await db.farmer.findUnique({
        where:
            { id },
        include: {
            location:
            {
                select:
                {
                    pradesh: true, district: true, mahaNagarpalika: true,
                    upaMahaNagarpalika: true, gaupalika: true,
                    nagarpalika: true,Woda:true
                }
            }
        }
    })

    return singleFarmerRequest;
}


// export const updateAnyDataOfFarmer = async (data: FarmerWithLocation,id:string): Promise< string> => {
//         const {
//         userId, farmName, profilePicture, pondSize, pradesh, district,mahaNagarpalika,upaMahaNagarpalika,gaupalika, nagarpalika, approved, active, Woda
//     } = data

//     const updateAnyDataOfFarmer = await db.farmer.update({
// where:{
//     id
// },
// data:{
//      farmName, profilePicture, pondSize,
// }
//     })

//     const updateLocationOfTheFarmer=await db.location.update({
//         where:{
//            farmerId:id
//         },
//         data:{
//             pradesh, district, mahaNagarpalika, upaMahaNagarpalika, gaupalika, nagarpalika,Woda
//         }
//     })

//     return "Your data is successfully updated!";
// }

