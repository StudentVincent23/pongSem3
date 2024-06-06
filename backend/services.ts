import { PrismaClient } from "@prisma/client";
// npx ts-node controller.ts
// om het te runnen
const prisma = new PrismaClient();

export async function AddUser(name: string, score: number) {
    await prisma.user.create({
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

export async function UpdateScoreOfUserById(id: number, score: number) {
    await prisma.user.update({
        where: {id: id},
        data:{ score: score} }) }

export async function DeleteUserById(id: number) {
    await prisma.user.delete({
        where: { id: id },
    });
}

async function main() {}

main()
    .then(async () => {
        await prisma.$disconnect();    
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1); })