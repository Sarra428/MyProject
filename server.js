const express = require ('express')
const connectDb = require('./config/connectDb')
const AuthRoute = require('./routes/Auth')
// const ClientRoute = require('./routes/client')
const RequestRoute = require('./routes/RDV')
const PostRoute = require('./routes/Post')




const app = express()

require('dotenv').config()

connectDb();


app.use(express.json())

app.use("/api/auth", AuthRoute)

app.use("/api/apoint", RequestRoute)
app.use('/api/post', PostRoute)


app.listen(process.env.port,   ()=>console.log(`port is running on port ${process.env.port}`)   )