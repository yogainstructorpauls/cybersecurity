import { Pool } from "pg"

if(!process.env.DATABASE_URL) {
    throw new Error("Database url missing in .env")
}

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    connectionTimeoutMillis: 10000
})

db.connect((err)=> {
    if(err){
        console.log(err)
    }
    console.log("connected")
})
db.query("SELECT NOW() AS time").then(result => console.log(result.rows))

export default db