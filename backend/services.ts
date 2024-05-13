import { PrismaClient } from "@prisma/client";
import exp from "constants";
// npx ts-node controller.ts
// om het te runnen
const prisma = new PrismaClient();

export async function AddUser(name: string, score: number) {
    const user = await prisma.user.create({
        data: {
            name: name,
            score: score
    },
    })
}

export async function GetUsers() {
    const users = await prisma.user.findMany();
    return users;
}

export async function UpdateScoreOfUserById(id: any, score: number) {
    const user = await prisma.user.update({
        where: {id: id},
        data:{ score: score}
    })
}


async function main() {
    const users = await prisma.user.findMany();

    console.log(users);
}

main()
    .then(async () => {
        await prisma.$disconnect();    
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })