import { PrismaClient } from "@prisma/client"


const run = async () => {
    const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] })
    await prisma.connect()

    const b = await prisma.enitityB.create({
        data: {
            name: "B NAME"
        }
    })

    const a = await prisma.enititA.upsert({
        where: {
            connectorId_indicator_query: {
                connectorId: b.id,
                indicator: "INDICATOR_A",
                query: "QUERY_A",
            }
        },
        create: {
            connector: { connect: { id: b.id } },
            indicator: "INDICATOR_A",
            query: "QUERY_A",
            name: "A NAME"
        },
        update: {
            name: "A NAME updated"
        }
    })

}


run().then(() => console.log("Finished"))
    .catch(console.error)
