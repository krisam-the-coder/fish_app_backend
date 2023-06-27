import { db } from "../utils/db.server"


type buyer = {
    userId: string,
    organizationName: string,
    profilePicture: string,
    active: boolean,
    approved: boolean,
};




export const getBuyers = async (): Promise<buyer[]> => {

    const allBuyers=await db.buyer.findMany({
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
            },
            Document: {
                select: {
                    idenfication: true, registration: true
                }
            },
            user: {
                select: {
                    userName: true,
                    phoneNumber: true
                }
            }
        }
    });
    return allBuyers;
}

export const createBuyerRequest = async (data: any): Promise<buyer | string> => {
    const {
        userId, organizationName, profilePicture,  pradesh, district, nagarpalika,upaMahaNagarpalika,gaupalika,mahaNagarpalika,
        Woda, idenfication, registration

    } =await data;




    const Buyer = await db.buyer.create({
        data: {
            organizationName, profilePicture,active: false, approved: false, userId
        }
    })

    const Location = await db.location.create({
        data: {
            pradesh, district, nagarpalika, buyerId: Buyer.id, Woda, mahaNagarpalika, gaupalika, upaMahaNagarpalika
        }
    })

    const Document = await db.document.create({
        data: { idenfication, registration }
    })

    if (Buyer && Location && Document) {
        return "New buyer request added Successfully"
    } else {
        return "Unable to create buyer request"
    }
}

export const getBuyer = async (id: string): Promise<buyer | null> => {

    const singleBuyer = db.buyer.findUnique(
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
                },
                Document: {
                    select: {
                        idenfication: true, registration: true
                    }
                },
                user: {
                    select: {
                        userName: true,
                        phoneNumber: true
                    }
                }
            }
        }
    )
    return singleBuyer;
}

export const rejectBuyerRequest = async (id: string): Promise<string> => {
    try {
        const deleteBuyerRequest = await db.buyer.deleteMany({
            where: {
                id,
                AND: [
                    { approved: false },
                    { active: false }
                ]
            }
        });
        if (deleteBuyerRequest) {
            return "Buyer rejected successfully!";
        } else {
            return "Failed to reject buyer!";
        }
    } catch (error) {
        // Handle any potential errors that occur during the deletion process
        return "An error occurred while deleting the farmer.";
    }
};
export const getBuyerRequests = async (): Promise<buyer[]> => {

    const getBuyerRequests=await db.buyer.findMany({
        where:
        {
            AND: [
                { approved: false },
                { active: false }
            ], 
        },
        include: {
            location:
            {
                select:
                {
                    pradesh: true, district: true, mahaNagarpalika: true,
                    upaMahaNagarpalika: true, gaupalika: true,
                    nagarpalika: true, Woda: true
                }
            },
            Document: {
                select: {
                    idenfication: true, registration: true
                }
            },
            user: {
                select: {
                    userName: true,
                    phoneNumber: true
                }
            }
            
        }
        
    })
    return getBuyerRequests;
}

export const getSingleBuyerRequest = async (id: string): Promise<buyer | null> => {

    const singleBuyerRequest = await db.buyer.findUnique({
        where:
            { id },
        include: {
            location:
            {
                select:
                {
                    pradesh: true, district: true, mahaNagarpalika: true,
                    upaMahaNagarpalika: true, gaupalika: true,
                    nagarpalika: true, Woda: true
                }
            },
            Document: {
                select: {
                    idenfication: true, registration: true
                }
            },
            user: {
                select: {
                    userName: true,
                    phoneNumber: true
                }
            }
        }
    })

    return singleBuyerRequest;
}

export const acceptBuyerRequest = async (id: string): Promise<string> => {
    try {
        const acceptBuyerRequest = await db.buyer.update({
            where: {
                id,
            },
            data: {
                approved: true,
                active: true
            }


        });
        if (acceptBuyerRequest) {
            return "Buyer accepted successfully!";
        } else {
            return "Failed to accept buyer!";
        }
    } catch (error) {
        // Handle any potential errors that occur during the deletion process
        return "An error occurred while accepting the farmer.";
    }
};





export const inActivateBuyer = async (id: string): Promise<string> => {
    const buyer = await db.buyer.findUnique({
        where: { id },
    });

    if (!buyer) {
        throw new Error("Buyer not found");
    }

    const updatedBuyer = await db.buyer.update({
        where: { id },
        data: {
            active: !buyer.active,
        },
    });

    return updatedBuyer.active ? 'Buyer activated successfully' : 'Buyer inactivated successfully';
};



