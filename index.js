require('dotenv').config(); 

import app from './server';
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongodbClint = mongodb.MongodbClint
const MongoDB_username = process.env.MongoDB_username
const MongoDB_password = process.env.MongoDB_username
const uri = `mongodb+srv://${MongoDB_username}:${MongoDB_password}@cluster0.6p40zhl.mongodb.net/?retryWrites=true&w=majority` 
const port = 8000

MongoClient.connect(
    uri,
    {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
    })
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
    console.log(`listening on port ${port}`)
    })
})