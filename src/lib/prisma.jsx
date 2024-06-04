 import { PrismaClient } from '@prisma/client';
/*
let prisma = new PrismaClient()

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma; */


//import { PrismaClient } from "../../prisma/generated/client"
//const prisma = new PrismaClient()

const prisma = new PrismaClient({
    log: ["info"]
})
export default prisma