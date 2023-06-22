const prisma = require("../../../lib/prisma");

const userRouter = async (req, res) => {
  try {
    // if (req.method === "GET") {
    //   if (req.query.id) {
    //     const { id } = req.query;
    //     const singleUser = await prisma.user.findUnique({
    //       where: {
    //         AND: [{ id }, { active: true }],
    //       },
    //     });
    //     res.send(singleUser);
    //   } else {
    //     const allUserData = await prisma.user.findMany();
    //     res.send(allUserData);
    //   }
 if (req.method === "POST") {
        const {userName,password}=req.params
        const addUser=await prisma.user.create({
            data:{
                userName,
                password
            }
        })
               res.send(addUser);
    } else {
      res.send("Method not allowed!");
    }
  } catch (err) {
    res.send("Internal server error.");
  }
};

module.exports = userRouter;
