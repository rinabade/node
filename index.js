const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const {requestMiddleware,errorMiddleware} = require('./middleware/requestLogger');
const sequelize = require('./utils/db-config');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/users', router);

app.use(requestMiddleware);
app.use(errorMiddleware);

app.get('/', (req,res)=>{
    res.send("Hello World");
})

sequelize
.sync()
.then(() =>{
    app.listen(process.env.PORT, ()=>{
        console.log(`App listening to the port: http://localhost:${process.env.PORT}`);
    })
})
.catch((error) =>{
        console.log("error", `${error.message}`);
    })


// app.listen(process.env.PORT, ()=>{
//     console.log(`App listening to the port: http://localhost:${process.env.PORT}`);
// })