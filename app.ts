import "reflect-metadata"
import "express-async-errors"
import express from "express"
import userRoutes from "./routers/user.routes"
import clientsRoutes from "./routers/client.routes"
import sessionRoutes from "./routers/session.routes"
import contactRoutes from "./routers/Contact.routes"
import handleError from "./errors/handlerror"


const app = express()
app.use(express.json())
app.use('/users', userRoutes)
app.use('/clients', clientsRoutes)
app.use('/login', sessionRoutes)
app.use('/contacts', contactRoutes)
app.use(handleError)


export default app
