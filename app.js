//  adding the dependencies
const express = require('express');// Requied the express package
const multer = require('multer');//required the multer package for the file uplodation
const cors = require('cors');
const bodyParse = require('body-parser');

// Initilizing the PORT & dependencies
const app = express();
const PORT = process.env.PORT || 1015;
const upload = multer({ storage: multer.memoryStorage() });

// Use this lines when you want to take user input from body and as a json file
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Use this lines when you want to take user input from body and as a json file
app.use(bodyParse.json()); // intialised bodyparse dependency to fetch the json data into body format
app.use(bodyParse.urlencoded({extended: true}));// intialised the bodyparser to encode the url inputs
app.use(cors());// intialise the corse to my application

// requiring the functions

const UserRegisterToAdmin = require('./routes/route');
const UserLoginOfAdmin = require('./routes/route');
const addProduct = require('./routes/route');
const searchProductByID = require('./routes/route');
const readAllProduct = require('./routes/route');
const queryform = require('./routes/route');
const getQuerries = require('./routes/route');
//  declearing the routes
app.post('/register', UserRegisterToAdmin);
app.get('/login', UserLoginOfAdmin);
app.post('/upload', upload.single('filename'), addProduct, (err, result)=>{
    if(err) throw err;
});
app.get('/searchbyid',searchProductByID);
app.get('/searchall', readAllProduct);
app.post('/querry',queryform);
app.get('/getallquerry',getQuerries);


const start = async()=> {
    try {
        app.listen(PORT, ()=>{
            console.log(`your api url is http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();