const { PrismaClient } = require("@prisma/client");

// Declare global variable
var prisma;

// Check if global.prisma is defined, otherwise create a new instance of PrismaClient
prisma = global.prisma || new PrismaClient();

// Set global.prisma to prisma if the environment is not production
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Export prisma as the default
module.exports= prisma;
