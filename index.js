const config = require('config'); //organizes hierarchial configurations for your app deployment environments (development, qa, staging, production)
const morgan = require('morgan'); //HTTP request logger
const helmet = require('helmet'); //Helps secure your apps by setting various HTTP headers.
const Joi = require('joi');
const logger = require('./logger');
const authenticate = require('./authenticate');
const express = require('express')
const app = express(); //we are giving our app the powers of express!

//process = global object in node which gives us access to the current process
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //returns environment to this node app
// app.get(`app: ${app.get('env')}`);

//MIDDLEWARE
//middleware function is a function that takes a request object and either returns a response to the client or passes control to another middleware function
app.use(express.json()); //sets req.body using Parse 
app.use(express.urlencoded({ extended: true })); //parses incoming requests with url encoded payloads
app.use(express.static('public')); //our static content
app.use(helmet()); 

//CONFIGURATION 
console.log('Application Name: ' + config.get('name')); 
console.log('Mail Server: ' + config.get('mail.host')); 
console.log('Mail Password: ' + config.get('mail.password')); //this is read from an environment variable, not a configuration file

//ENVIRONMENT
//below is how you can tell if your code is running on a development, testing, staging, or production machine
if (app.get('env') === 'development') {
    app.use(morgan('tiny')); //with morgan in place, everytime we send a request to the server, it will be locked
    console.log('Morgan enabled...'); 
};


//custom middleware
app.use(logger);
app.use(authenticate); 


const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'}, 
    { id: 3, name: 'course3'},  
]

app.get('/', (req, res) => { //setting up a route to respond to
    res.send("Welcome to the root route of the web server"); 
});

app.get('/api/courses', (req, res) => { //setting up a route to respond to
    res.send(courses); 
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); //only interested in error message so we use object destructuring { error } 
    if (error) {
        return res.status(400).send(error.details[0].message)
    };

    //we need to read the course object, use its properties to create a new course object, and then add that course object to our courses array

    const course = { 
    id: courses.length + 1, //we get the # of elements in our courses array, then add 1 to it
    name: req.body.name, 
    };
    courses.push(course); 
    res.send(course); 
}); 

function validateCourse(course) {
    const schema = { 
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema); 
}


app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id was not found.');
    
    //validate
    //if invalid, return 400 error
        const result = validateCourse(req.body); 
        const { error } = validateCourse(req.body); //only interested in error message so we use object destructuring { error } 
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

    //update course
    //return updated course to client
    course.name = req.body.name; 
    res.send(course);
}); 

app.delete('/api/courses/:id', (req, res) => {
    //look up course 
    //if doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id was not found.');

    //delete
    const index = courses.indexOf(course); 
    courses.splice(index, 1); 

    //return the deleted course
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => { 
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id was not found.');
    res.send(course); 
}); 


//we use route parameters like /:year/:month for essential/required values
//we use query paramaters like (req.query) or ?sortBy=name at the end of the route
//query paramters are stored in an object with a bunch of key value pairs


//env stands for environment variable
//in the terminal: export PORT=5000 
const port = process.env.PORT || 5100; //process environment variables accessed when you do printenv
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}); 

//printenv
//export PORT=5100
//printenv
//output: PORT=5100