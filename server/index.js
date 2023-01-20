import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
// const dbClient = mongodb.MongoClient



function connectToDB() {
    mongoose.connect(process.env.INVITATIONS_DB_URI,
        {maxPoolSize: 10,useNewUrlParser: true}
    )
    const dbConnection = mongoose.connection
   dbConnection.once('open', () => {
        console.log("database connected");
      })
    }

const port = process.env.PORT || 8000    
connectToDB();
app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})
// connectToDB()
// .catch(
//     error => {console.log(err)}
//     )
// .then(

// );    


