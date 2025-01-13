import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const createUser = async() => {
    const user = await client.user.create({
        data: {
            username: "naveenrajan",
            password: "adjbfidsfssdfnk"
        },
        select: {
            username: true
        }
    })
    console.log(user)
}
createUser()