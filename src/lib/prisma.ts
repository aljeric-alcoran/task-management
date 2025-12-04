import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
   host: process.env.NEXT_PUBLIC_MYSQL_HOST,
   port: Number(process.env.NEXT_PUBLIC_MYSQL_PORT),
   user: process.env.NEXT_PUBLIC_MYSQL_USER,  
   password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
   database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
   connectionLimit: 5
})

const prismaClientSingleton = () => {
   return new PrismaClient({ adapter })
}

declare const globalThis: {
   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma
if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') globalThis.prismaGlobal = prisma