const express = require('express');
const router = express.Router();  
//instead of working with the app object, we are working with the router object

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'}, 
    { id: 3, name: 'course3'},  
]

router.get('/', (req, res) => { //setting up a route to respond to
    res.send(courses); 
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id was not found.');
    
    //validate
    //if invalid, return 400 error
        const { error } = validateCourse(req.body); //only interested in error message so we use object destructuring { error } 
        if (error) return res.status(400).send(error.details[0].message);

    //update course
    //return updated course to client
    course.name = req.body.name; 
    res.send(course);
}); 

router.delete('/:id', (req, res) => {
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

router.get('/:id', (req, res) => { 
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id was not found.');
    res.send(course); 
}); 

function validateCourse(course) {
    const schema = { 
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema); 
}

module.exports = router; 
//export router at the end of the module