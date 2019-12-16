const debug = require('debug')('app:startup'); //we get a function for debugging messages in this namespace
const config = require('config'); //organizes hierarchial configurations for your app deployment environments (development, qa, staging, production)
const morgan = require('morgan'); //HTTP request logger
const helmet = require('helmet'); //Helps secure your apps by setting various HTTP headers.
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express');
const app = express(); //we are giving our app the powers of express!

//TEMPLATING ENGINES
app.set('view engine', 'pug'); //express will internally load this module
app.set('views', './views'); //put all views/templates in folder views (default)

//MIDDLEWARE
//middleware function is a function that takes a request object and either returns a response to the client or passes control to another middleware function
app.use(express.json()); //sets req.body using Parse 
app.use(express.urlencoded({ extended: true })); //parses incoming requests with url encoded payloads
app.use(express.static('public')); //our static content
app.use(helmet()); 
app.use('/api/courses', courses); 
app.use('/', home); //any apps that start with / use the home router

//CONFIGURATION 
// console.log('Application Name: ' + config.get('name')); 
// console.log('Mail Server: ' + config.get('mail.host')); 
// console.log('Mail Password: ' + config.get('mail.password')); //this is read from an environment variable, not a configuration file

//ENVIRONMENT
//below is how you can tell if your code is running on a development, testing, staging, or production machine
if (app.get('env') === 'development') {
    app.use(morgan('tiny')); //with morgan in place, everytime we send a request to the server, it will be locked
    debug('Morgan enabled...'); //DEBUGGER WORK
}

//CUSTOM MIDDLEWARE
app.use(logger);


//env stands for environment variable
//process.env = global object in node which gives us access to the current process
//in the terminal: export PORT=5000 
const port = process.env.PORT || 5100; //process environment variables accessed when you do printenv
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//we use route parameters like /:year/:month for essential/required values
//we use query paramaters like (req.query) or ?sortBy=name at the end of the route
//query paramters are stored in an object with a bunch of key value pairs

//printenv
//export PORT=5100
//printenv
//output: PORT=5100