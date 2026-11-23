import  express  from "express";
import indexRouter from "./routes/index.js";
import { devLogger, writeLogger } from "./middleware/logger.js";
import morgan from "morgan";
import clientRouter from "./routes/clients.router.js"
import { validate } from "./middleware/validate.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json({limit: "20kb"}))
app.use(devLogger)
app.use(cookieParser())
app.use(morgan("combined", {stream: writeLogger}))
app.use('/v1', indexRouter)
app.use('/v1/client', clientRouter)
app.get("/", (req, res)=> {
    res.json({msg:"test"})
})
app.use((req, res)=> {
    res.status(404).json({error: "Endpoint not found"})
})
 
export default app