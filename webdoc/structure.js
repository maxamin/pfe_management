class DatabaseFileManagerClient {
    constructor() {
        this.apiUrl = 'router_riding_high.php'; // Replace with your PHP API endpoint
    }

    sendRequest(method, endpoint, data = null) {
        return new Promise((resolve, reject) => {
            let url = `${this.apiUrl}?function=${endpoint}`;
    
            // Convert data object to query parameters
            if (data && typeof data === 'object') {
                url += '&' + Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
            }
    
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
    
            xhr.setRequestHeader('Content-Type', 'application/json');
    
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            };
    
            xhr.onerror = function () {
                reject('Network error');
            };
    
            xhr.send();
        });
    }

    createFile(filename, content, directory, directoryId, callback) {
        const data = { filename, content, directory, directoryId };
        return this.sendRequest('GET', 'createFile', data, callback);
    }

    getMe(callback) {
        // Corrected the method name to match the function in router_riding_high.php
        const data = {};
        return this.sendRequest('GET', 'me', data, callback);
    }

    readFile(filename, directory, callback) {
        const data = { filename, directory };
        return this.sendRequest('GET', 'readFile', data, callback);
    }

    writeFile(filename, content, directory, callback) {
        const data = { filename, content, directory };
        return this.sendRequest('GET', 'writeFile', data, callback);
    }

    deleteFile(filename, directory, callback) {
        const data = { filename, directory };
        return this.sendRequest('GET', 'deleteFile', data, callback);
    }

    listFiles(directory, callback) {
        const data = { directory };
        return this.sendRequest('GET', 'listFiles', data, callback);
    }
    listDirectories(parentDirectory, callback) {
        const data = { parentDirectory };
        return this.sendRequest('GET', 'listDirectories', data, callback);
    }
    createDirectory(directory,content, parentDirectory, directoryId, callback) {
        const data = { directory,content, parentDirectory, directoryId };
        return this.sendRequest('GET', 'createDirectory', data, callback);
    }

    

    deleteDirectory(directory, callback) {
        const data = { directory };
        return this.sendRequest('GET', 'deleteDirectory', data, callback);
    }

    info(directory, callback) {
        const data = { directory };
        return this.sendRequest('GET', 'info', data, callback);
    }

    listUsers(callback) {
        const data = {};
        return this.sendRequest('GET', 'listUsers', data, callback);
    }

    removeUser(userId, callback) {
        const data = { userId };
        return this.sendRequest('GET', 'removeUser', data, callback);
    }
    modifyUser_fromhtml() {
        const userId = document.getElementById("userId").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("password").value;
        const departement = document.getElementById("departement").value;
        const associatedDirectories = document.getElementById("associatedDirectories").value;
    
        this.modifyUser(userId, username, password, departement,email, associatedDirectories, (error, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log(response);
                // Handle success, e.g., redirect or show a success message
            }
        });
    }
    getUserDetails() {
        const userId = document.getElementById("userId").value;
    
        this.getUser(userId, (error, userDetails) => {
            
        }).then(response => {
            // Handle successful response
            document.getElementById("username").value = response.username;
            document.getElementById("password").value = response.password;
            document.getElementById("departement").value = response.departement;
            document.getElementById("associatedDirectories").value = response.associatedDirectories;
        }).catch(error => {
            // Handle error
            console.error(error);
        });
    }

    modifyUser(userId, username, password, departement,email, associatedDirectories, callback) {
        const data = { userId, username, password, departement,email, associatedDirectories };
        return this.sendRequest('GET', 'modifyUser', data, callback);
    }

    addUser(username, password, departement,email, associatedDirectories, callback) {
        const data = { username, password, departement,email, associatedDirectories };
        return this.sendRequest('GET', 'addUser', data, callback);
    }

    getUser(username, callback) {
        const data = { username };
        return this.sendRequest('GET', 'getUser', data, callback);
    }

    listUsers(callback) {
        const data = {};
        return this.sendRequest('GET', 'listUsers', data, callback);
    }

    exportDirectory(directory, targetPath, directoryId, callback) {
        const data = { directory, targetPath, directoryId };
        return this.sendRequest('GET', 'exportDirectory', data, callback);
    }
    getColor(userRank) {
        // Assuming userRank ranges from 0 to 100
        const red = Math.round(255 * (100 - userRank) / 100);
        const green = Math.round(255 * userRank / 100);
        const blue = 0;
        return `rgb(${red},${green},${blue})`;
    }
    Paint_it_black(fetchedUserStats){
        console.log(fetchedUserStats);
                const userStatsContainer = document.getElementById("userStatsContainer");
    
                fetchedUserStats.forEach(user => {
                    const color = this.getColor(user.userRank);
    
                    // Create user stats card
                    const userStatsCard = document.createElement("div");
                    userStatsCard.className = "userStatsCard";
                    userStatsCard.style.backgroundColor = color;
                    userStatsCard.innerHTML = `
                        <h5>${user.username}</h5>
                        <p>Percentage: ${user.userRank}%</p>
                    `;
    
                    // Append card to container
                    userStatsContainer.appendChild(userStatsCard);
                });
            }
        
    getUserStats(callback) {
        const data = {};
        return this.sendRequest('GET', 'getUserStats', data, callback)
        .then(response => {
            // Handle successful response
            this.Paint_it_black(response);
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
    }
    
    search(query, callback) {
        const data = { query };
        return this.sendRequest('GET', 'search', data, callback);
    }
}

// Asynchronous function to build the file system tree
async function buildFileSystemTree(directory, parent = '/') {
    const dbFileManagerClient = new DatabaseFileManagerClient();

    try {
        // Fetch directories and files for the current directory
        const directories = await dbFileManagerClient.listDirectories(directory);
        const files = await dbFileManagerClient.listFiles(directory);

        // Create the current directory object
        const currentDirectory = {
            isDirectory: true,
            name: directory,
            child: [],
        };

        // Add files to the current directory
        currentDirectory.child = files.map(file => ({
            isDirectory: false,
            name: file,
        }));

        // Recursively build the file system tree for each subdirectory
        for (const subdirectory of directories) {
            const subdirectoryPath = subdirectory.directory.replace("/", '');
            const subdirectoryTree = await buildFileSystemTree(subdirectoryPath, currentDirectory);
            currentDirectory.child.push(subdirectoryTree);
        }

        return currentDirectory;
    } catch (error) {
        console.error('Error building file system tree:', error);
        throw error;
    }
}

// Example usage
let getFileSystemTree = async () => {
    try {
        // Initialize the fileSystemTree variable
        const fileSystemTree = await buildFileSystemTree('/');
        console.log(fileSystemTree);
        return fileSystemTree;
    } catch (error) {
        console.error('Error building file system tree:', error);
        throw error; // Re-throw the error to propagate it if needed
    }
};

getFileSystemTree();