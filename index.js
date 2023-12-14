const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const {requestMiddleware,errorMiddleware} = require('./middleware/requestLogger');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/users', router);

app.use(requestMiddleware);
app.use(errorMiddleware);

app.get('/', (req,res)=>{
    res.send("Hello World");
})



app.listen(port, ()=>{
    console.log(`App listening to the port: http://localhost:${port}`);
})