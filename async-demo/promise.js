const promise = new Promise((resolve, reject) => {
//Kick off some async work
//access database, start timer... 
//when completed: value or error
setTimeout(() => {
    // resolve(1); 
    reject(new Error('message')); 
}, 2000);
}); 

promise
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));

    //A promise is an OBJECT which holds the eventual result of an async operation
    //Originally it's in the PENDING state
    //It completes an asycn operation and displays either resolved => fulfilled, or rejected