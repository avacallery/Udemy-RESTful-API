//How can we access the user object in the main program in line 2? 
//Three patterns to deal with asynchronous code: 
//Callbacks
//Promises - expose .then methods, we can chain them to implement a complex async operation
//Async/await 



console.log('Before');

// //Callback-based approach
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits); 
//         })
//     })
// });



//promise-based approach
//Chain of calls to the then method
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));



//ASYNC-AND-AWAIT APPROACH
//With the await operator, we can write asynchonrous code that looks like synchronous code
//Whenever we use await, we need to have a function thats decorated with async
// //Must wrap code in a try catch block for errors 
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } 
    catch (err) {
        console.log('Error', err.message); 
    }
};

displayCommits(); //This returns a promise that is void. It doesn't return a value. async and await are built on top of promises. 


console.log('After');

function getUser(id) { //callback function we call when the result of an async operation is ready
    return new Promise((resolve, reject) => {
        //kickoff async work
        setTimeout(() => {
            console.log('Reading a user from the database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
};

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'))
        }, 2000);
    });
};

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve([['commit']]);
        }, 2000);
    });
};  