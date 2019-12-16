//Sometimes you want to create a promise that is already resolved. This is useful for writing unit-tests. You want to simulate a scenario, where an async operation like calling a web service completes successfully. A unit-test is where this operation in a promise is already resolved, OR AN ERROR

//RESOLVED 
// const promise = Promise.resolve({ id: 1}); 
// promise.then(result => console.log(result));

//ERROR
// const promise = Promise.reject(new Error('reason for rejection...'));
// promise.catch(error => console.log(error)); 

const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...')
        resolve(1); 
    }, 2000)
});


const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2...')
        resolve(2); 
    }, 2000)
});

Promise.race([promise1, promise2]) //returns value of the FIRST fulfilled promise. .all returns all values of promises
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));