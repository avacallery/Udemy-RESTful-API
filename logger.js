function log (req, res, next) {
    console.log('Logging...');
    next(); //must be used to pass control to another middleware function to end the req, res cycle
    //if we don't use next, our req will be left hanging 
};

module.exports = log; //exports single function