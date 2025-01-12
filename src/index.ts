// First Postgress App

import { Client } from 'pg'

const connectionString = "postgresql://test_owner:2Obki0PejtNh@ep-bold-recipe-a5t4z5al.us-east-2.aws.neon.tech/test?sslmode=require"

const pgClient2 = new Client({
    user: "test_owner",
    password: "2Obki0PejtNh",
    host: "ep-bold-recipe-a5t4z5al.us-east-2.aws.neon.tech",
    port: 5432,
    database: "test"
})
const pgClient = new Client(connectionString)

const main = async () => {
    await pgClient.connect()
    const res = await pgClient.query("SELECT * FROM users;")
    console.log(res)
}

main()