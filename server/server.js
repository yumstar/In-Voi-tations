import express from "express"
import cors from "cors"
import contactRouter from "./routes/contacts.route.js"
import eventInfoRouter from "./routes/eventInfos.route.js"
const app = express()

app.use(cors())
app.use(express.json())

app.use("/contact", contactRouter)
app.use("/eventInfo", eventInfoRouter)


export default app