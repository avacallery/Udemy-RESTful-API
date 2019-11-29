const Joi = require('joi');
const express = require('express')
const app = express(); //we are giving our app the powers of express!
//expressjs.com 

app.use(express.json()); //what we're doing here is adding the middleware 

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
    if (error) return res.status(400).send(error.details[0].message);

    //we need to read the course object, use its properties to create a new course object, and then add that course object to our courses array

    const course = { 
    id: courses.length + 1, //we get the # of elements in our courses array, then add 1 to it
    name: req.body.name, 
    };
    courses.push(course); 
    res.send(course); 
}); 

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id was not found.');
    
        const { error } = validateCourse(req.body); //only interested in error message so we use object destructuring { error } 
        if (error) return res.status(400).send(error.details[0].message);
         

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