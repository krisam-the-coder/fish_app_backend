import { db } from "../utils/db.server"

type FarmerSupply = {
    fishType: string,
    avgFishWeight: number,
    totalWeight: number,
    yieldDate: Date,
    farmerId: string,
};

type Success = {
    success: boolean,
    message: String
}




export const createFarmerSupply = async (data: any): Promise<Success> => {
    const { fishType, avgFishWeight, totalWeight, yieldDate, farmerId } = data;

    const createFarmerSupply = await db.farmerSupply.create({
        data: {
            fishType, avgFishWeight, totalWeight, yieldDate: new Date(yieldDate), farmerId
        }
    })
    if (createFarmerSupply) {
        return { success: true, message: "Farmer supply created successfully!" }
    }
    else {
        return { success: false, message: "Farmer supply is not created!" }
    }

}

export const deleteFarmerSupply = async (id: string): Promise<Success | null> => {

    const isFarmerSupply = await db.farmerSupply.findUnique({
        where: { id }
    })
    if (isFarmerSupply) {
        const deleteSupply = await db.farmerSupply.delete({
            where: {
                id
            }
        })

        return ({ success: true, message: " Your farmer Supply is deleted successfully." })
    }
    else {
        return isFarmerSupply
    }

}


export const updateFarmerSupply = async (data: any, id: string): Promise<FarmerSupply | null> => {

    const { fishType, avgFishWeight, totalWeight, yieldDate, farmerId } = data;
    const isFarmerSupply = await db.farmerSupply.findUnique({
        where: { id }
    })
    if (isFarmerSupply) {
        const updateFarmerSupply = await db.farmerSupply.update({
            where: {
                id
            },
            data: {
                fishType, avgFishWeight, totalWeight, yieldDate: new Date(yieldDate), farmerId
            }
        })
        return updateFarmerSupply;
    }
    else {
        return isFarmerSupply;
    }


}

export const getFarmerSupplies = async (date: any, location: any, fishType: any): Promise<FarmerSupply[]> => {
    if (date !== undefined) {
        let getFarmerSupplies;
        return getFarmerSupplies = await db.farmerSupply.findMany({
            where: {
                yieldDate: new Date(date)
            }
        })
    }
    if (location !== undefined) {
        let getFarmerSupplies;
        return getFarmerSupplies = await db.farmerSupply.findMany({
            where: {
                farmer: {
                    location: {
                        district: location
                    }
                }
            }
        })
    }
    if (fishType !== undefined) {
        console.log(fishType)
        let getFarmerSupplies;
        return getFarmerSupplies = await db.farmerSupply.findMany({
            where: {
                fishType: fishType
            }
        })
    }
    const getFarmerSupplies = await db.farmerSupply.findMany({
    })
    return getFarmerSupplies;
}




export const getFarmerSupply = async (id: string): Promise<FarmerSupply[] | null> => {

    const isFarmer = await db.farmer.findUnique({
        where: {
            id
        }
    })
    if (isFarmer) {
        const getFarmerSupply = await db.farmerSupply.findMany({
            where: {
                farmerId: id
            },
            include: {
                BuyerRequest: {
                    select: {
                        id: true
                    }
                }
            }
        })

        return getFarmerSupply;
    }
    else return isFarmer

}
