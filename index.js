const express = require('express');
const bodyParser = require('body-parser');
const userouter = require('./routes/router');
const {requestMiddleware,errorMiddleware} = require('./middleware/requestLogger')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/users', userouter);

app.use(requestMiddleware);
app.use(errorMiddleware);

app.get('/', (req,res)=>{
    res.send("Hello World");
})


app.listen(process.env.PORT, (req,res,next)=>{
    console.log(`App listening to the port: http://localhost:5000`);
})
