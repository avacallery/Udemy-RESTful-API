const express = require('express')
const app = express(); //we are giving our app the powers of express!
//expressjs.com 

app.get('/', (req, res) => { //setting up a route to respond to
    res.send("Welcome to the root route of the web server"); 
})

app.get('/api/courses', (req, res) => { //setting up a route to respond to
    res.send([1,2,3]); 
})

app.get('/api/courses/:id', (req, res) => { 
    res.send(req.params.id); //we have access to whatever the user types in after the (:) which is a parameter 
})

app.get('/api/posts/:year/:month', (req, res) => { 
    res.send(req.params.year); 
})

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