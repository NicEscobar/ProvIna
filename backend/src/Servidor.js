const express = require ('express');
const routes = require('./router');
const cors = require('cors');
const morgan = require('morgan');

/*
const corsOptions ={
    
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}*/

const app = express();

//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
//app.use(morgan("dev"));
app.use(routes);


app .listen(3333);