import { DatabaseFileManagerClient } from './router.js';

// Test createFile function
const dbFileManagerClient = new DatabaseFileManagerClient();
dbFileManagerClient.createFile('example.txt', 'Hello World!', '/', 1, (error, response) => {
    if (error) {
        console.error('createFile Error:', error);
    } else {
        console.log('createFile Response:', response);
    }
});

// Test getMe function
dbFileManagerClient.getMe((error, response) => {
    if (error) {
        console.error('getMe Error:', error);
    } else {
        console.log('getMe Response:', response);
    }
});
dbFileManagerClient.deleteFile('example.txt', '/', (error, response) => {
    if (error) {
        console.error('Deletefile Error:', error);
    } else {
        console.log('Deletefile Response:', response);
    }
});
// Test readFile function
dbFileManagerClient.readFile('example.txt', '/', (error, response) => {
    if (error) {
        console.error('readFile Error:', error);
    } else {
        console.log('readFile Response:', response);
    }
});

// Test writeFile function
dbFileManagerClient.writeFile('example.txt', 'Updated content', '/', (error, response) => {
    if (error) {
        console.error('writeFile Error:', error);
    } else {
        console.log('writeFile Response:', response);
    }
});


// Test listFiles function
dbFileManagerClient.listFiles('/Documents', (error, response) => {
    if (error) {
        console.error('listFiles Error:', error);
    } else {
        console.log('listFiles Response:', response);
    }
});

// Test createDirectory function
dbFileManagerClient.createDirectory('newFolder',"a new" ,'/', 1, (error, response) => {
    if (error) {
        console.error('createDirectory Error:', error);
    } else {
        console.log('createDirectory Response:', response);
    }
});

// Test listDirectories function
dbFileManagerClient.listDirectories('/', (error, response) => {
    if (error) {
        console.error('listDirectories Error:', error);
    } else {
        console.log('listDirectories Response:', response);
    }
});

// Test deleteDirectory function
dbFileManagerClient.deleteDirectory('/Documents', (error, response) => {
    if (error) {
        console.error('deleteDirectory Error:', error);
    } else {
        console.log('deleteDirectory Response:', response);
    }
});

// Test info function
dbFileManagerClient.info('/', (error, response) => {
    if (error) {
        console.error('info Error:', error);
    } else {
        console.log('info Response:', response);
    }
});

// Test listUsers function
dbFileManagerClient.listUsers((error, response) => {
    if (error) {
        console.error('listUsers Error:', error);
    } else {
        console.log('listUsers Response:', response);
    }
});

// Test removeUser function
dbFileManagerClient.removeUser(1, (error, response) => {
    if (error) {
        console.error('removeUser Error:', error);
    } else {
        console.log('removeUser Response:', response);
    }
});

// Test modifyUser function
dbFileManagerClient.modifyUser(1, 'newUser', 'password123', 'admin',"test@test.test", ['documents'], (error, response) => {
    if (error) {
        console.error('modifyUser Error:', error);
    } else {
        console.log('modifyUser Response:', response);
    }
});

// Test addUser function
dbFileManagerClient.addUser('newUser', 'password123', 'admin',"test@test.test", ['documents'], (error, response) => {
    if (error) {
        console.error('addUser Error:', error);
    } else {
        console.log('addUser Response:', response);
    }
});

// Test getUser function
dbFileManagerClient.getUser('newUser', (error, response) => {
    if (error) {
        console.error('getUser Error:', error);
    } else {
        console.log('getUser Response:', response);
    }
});

// Test listUsers function (again)
dbFileManagerClient.listUsers((error, response) => {
    if (error) {
        console.error('listUsers Error:', error);
    } else {
        console.log('listUsers Response:', response);
    }
});

// Test exportDirectory function
dbFileManagerClient.exportDirectory('documents', '/exported', 1, (error, response) => {
    if (error) {
        console.error('exportDirectory Error:', error);
    } else {
        console.log('exportDirectory Response:', response);
    }
});

// Test getUserStats function
dbFileManagerClient.getUserStats((error, response) => {
    if (error) {
        console.error('getUserStats Error:', error);
    } else {
        console.log('getUserStats Response:', response);
    }
});

// Test search function
dbFileManagerClient.search('keyword', (error, response) => {
    if (error) {
        console.error('search Error:', error);
    } else {
        console.log('search Response:', response);
    }
});
