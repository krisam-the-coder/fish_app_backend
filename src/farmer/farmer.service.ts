import { db } from "../utils/db.server"


type Farmer = {
    userId: string,
    profiilePicture: string,
    farmName: string,
    pondSize: number,
    active: boolean
    approved: boolean
}


export const getFarmers = async (): Promise<Farmer[] | null> => {

    try {

        return db.farmer.findMany({ where: { active: true, approved: true }, include: { location: { select: { pradesh: true, district: true, mahaNagarpalika: true, upaMahaNagarpalika: true, gaupalika: true,nagarpalika:true } } } })

    } catch (error) {

    }

    return null
}





export const createFarmer = async (data: any): Promise<Farmer | string> => {
    const {
        userId, farmName, profiilePicture, pondSize, pradesh, district, nagarpalika, approved, active, Woda
    } = data


    const Farmer = await db.farmer.create({
        data: {
            farmName, profiilePicture, pondSize, active, approved, userId
        }
    })

    const Location = await db.location.create({
        data: {
            pradesh, district, nagarpalika, farmerId: Farmer.id, Woda
        }
    })

    if (Farmer && Location) {
        return Farmer
    } else {
        return "Unable to create Farmer"
    }
}





