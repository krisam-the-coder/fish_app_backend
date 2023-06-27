import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"

// import All Router

import { userRouter } from "./User/user.router"
import { FarmerRouter } from "./farmer/farmer.router"
import { BuyerRouter } from "./buyer/buyer.router"
import { farmerSupplyRouter } from "./farmerSupply/farmerSupply.router"
import { buyerDemandRouter } from "./buyerDemand/buyerDemand.router"
import { buyerRequestRouter } from "./buyerRequest/buyerRequest.router"

dotenv.config()

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT)

const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/user', userRouter)
app.use('/api/farmer', FarmerRouter)
app.use('/api/buyer', BuyerRouter)
app.use('/api/farmerSupply', farmerSupplyRouter)
app.use('/api/buyerDemand', buyerDemandRouter)
app.use('/api/buyerRequest', buyerRequestRouter)

app.get('/api/', (req, res) => {
    res.send("Api running correctly")
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})