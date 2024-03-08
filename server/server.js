const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');   //converting to json
const cors= require('cors');                //ur url is working on other applications or api is used for cross-section
const courseRoute= require('./Routers/courseroute');
const facultyRoute= require('./Routers/facultyroute');

//EXPRESS, BODY-PARSER & CORS
const app= express();
app.use(bodyParser.json());
app.use(cors());

//CONNECTION ESTABLISHMENT BETWEEN NODE.JS TO MONGODB
const MONGO_URL='';
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db= mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'))       //2nd para is the message, when error occurs it handles

//CONTROLLERS-> PATH OF YOUR ROUTERS
app.use('/api/course', courseRoute);
app.use('/api/faculty',facultyRoute);

//STARTING YOUR SERVER
app.get('/',(req,res)=>{                            //end point
    res.send("First Node server");                        //response to req parameter
})                               

app.listen(5000, ()=>{                              //to run the server
    console.log('server is running on port 5000');
})              
