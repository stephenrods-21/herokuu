//Packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const cron = require('node-cron');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log('connected to database ' + config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log('Database error' + err);
});

const app = express();
const port = 3000;
//const port = process.env.PORT || 8080;

//CORS Middleware
app.use(cors());
//Body Parser Middleware
app.use(bodyParser.json());
//Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Initialize Server
app.listen(port, () => {
 console.log("server started on port: "+port);

 // schedule tasks to be run on the server   
 cron.schedule("* * * * *", function() {
    console.log("running a task every minute");
  });
});

//App Routes
app.get('/', (req,res)=>{
    res.send("Invalid Endpoint..////");
});
app.get('/dashboard', (req,res)=>{
    res.send("Welcom to Dashboard");
});

//Users Routes
const users = require('./routes/users');
app.use('/users', users);