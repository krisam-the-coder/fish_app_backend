const prisma = require("../../../lib/prisma");

const farmerRouter = async (req, res) => {
  try {
    if (req.method === "GET") {
      if (req.query.id) {
        const { id } = req.query;
        const singleFarmer = await prisma.farmer.findUnique({
          where: {
            AND: [{ id }, { active: true }, { approved: true }],
          },
        });
        res.send(singleFarmer);
      } else {
        const allFarmerData = await prisma.farmer.findMany({
          where: {
            AND: [{ active: true }, { approved: true }],
          },
        });
        res.send(allFarmerData);
      }
    } else if (req.method === "POST") {
      const {
        userId,
        province,
        profiilePicture,
        farmName,
        pondSize,
        district,
        nagarpalika,
        mahaNagarpalika,
        upaMahaNagarpalika,
        gaupalika,
        Woda,
      } =await req.body;

      console.log(district);

      const createLocation = await prisma.location.create({
        data: {
          province,
          district,
          nagarpalika,
          mahaNagarpalika,
          upaMahaNagarpalika,
          gaupalika,
          Woda,
        },
      });
      // console.log(createLocation);
      if (createLocation) {
        const createFarmer = await prisma.farmer.create({
          data: {
            userId,
            profiilePicture,
            farmName,
            pondSize,
            locationId: createLocation.id,
          },
        });
        res.send(createFarmer);
      }
    } else {
      res.send("Method not allowed!");
    }
  } catch (err) {
    res.send("Internal server error.");
  }
};

module.exports = farmerRouter;
