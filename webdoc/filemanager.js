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

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            };

            xhr.onerror = function() {
                reject('Network error');
            };

            xhr.send();
        });
    }

    createFile(filename, content, directory, directoryId, callback) {
        const data = {
            filename,
            content,
            directory,
            directoryId
        };
        return this.sendRequest('GET', 'createFile', data, callback);
    }

    getMe(callback) {
        // Corrected the method name to match the function in router_riding_high.php
        const data = {};
        return this.sendRequest('GET', 'me', data, callback);listfiles
    }

    readFile(filename, directory, callback) {
        const data = {
            filename,
            directory
        };
        return this.sendRequest('GET', 'readFile', data, callback);
    }

    writeFile(filename, content, directory, callback) {
        const data = {
            filename,
            content,
            directory
        };
        return this.sendRequest('GET', 'writeFile', data, callback);
    }

    deleteFile(filename, directory, callback) {
        const data = {
            filename,
            directory
        };
        return this.sendRequest('GET', 'deleteFile', data, callback);
    }

    listFiles(directory, callback) {
        const data = {
            directory
        };
        return this.sendRequest('GET', 'listFiles', data, callback);
    }
    listDirectories(parentDirectory, callback) {
        const data = {
            parentDirectory
        };
        return this.sendRequest('GET', 'listDirectories', data, callback);
    }
    createDirectory(directory, content, parentDirectory, directoryId, callback) {
        const data = {
            directory,
            content,
            parentDirectory,
            directoryId
        };
        return this.sendRequest('GET', 'createDirectory', data, callback);
    }



    deleteDirectory(directory, callback) {
        const data = {
            directory
        };
        return this.sendRequest('GET', 'deleteDirectory', data, callback);
    }

    async info(directory, callback) {
        const data = {
            directory
        };
        return this.sendRequest('GET', 'info', data, callback);
    }

    listUsers(callback) {
        const data = {};
        return this.sendRequest('GET', 'listUsers', data, callback);
    }

    removeUser(userId, callback) {
        const data = {
            userId
        };
        return this.sendRequest('GET', 'removeUser', data, callback);
    }
    modifyUser_fromhtml() {
        const userId = document.getElementById("userId").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("password").value;
        const departement = document.getElementById("departement").value;
        const associatedDirectories = document.getElementById("associatedDirectories").value;

        this.modifyUser(userId, username, password, departement, email, associatedDirectories, (error, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log(response);
                // Handle success, e.g., redirect or show a success message
            }
        });
    }
    renameItem(oldName, newName, directory,isdirectory, callback) {
        const data = { oldName, newName, directory,isdirectory };
        return this.sendRequest('GET', 'rename', data, callback);
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

    modifyUser(userId, username, password, departement, email, associatedDirectories, callback) {
        const data = {
            userId,
            username,
            password,
            departement,
            email,
            associatedDirectories
        };
        return this.sendRequest('GET', 'modifyUser', data, callback);
    }

    addUser(username, password, departement, email, associatedDirectories, callback) {
        const data = {
            username,
            password,
            departement,
            email,
            associatedDirectories
        };
        return this.sendRequest('GET', 'addUser', data, callback);
    }

    getUser(username, callback) {
        const data = {
            username
        };
        return this.sendRequest('GET', 'getUser', data, callback);
    }

    listUsers(callback) {
        const data = {};
        return this.sendRequest('GET', 'listUsers', data, callback);
    }

    exportDirectory(directory, targetPath, ownerid, callback) {
        const data = {
            directory,
            targetPath,
            ownerid
        };
        return this.sendRequest('GET', 'exportDirectory', data, callback);
    }
    getColor(userRank) {
        // Assuming userRank ranges from 0 to 100
        const red = Math.round(255 * (100 - userRank) / 100);
        const green = Math.round(255 * userRank / 100);
        const blue = 0;
        return `rgb(${red},${green},${blue})`;
    }
    Paint_it_black(fetchedUserStats) {
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
        const data = {
            query
        };
        return this.sendRequest('GET', 'search', data, callback);
    }
}
let fileSystemTree;
const dbFileManagerClient = new DatabaseFileManagerClient();
// Asynchronous function to build the file system tree
async function buildFileSystemTree(directory) {
    const dbFileManagerClient = new DatabaseFileManagerClient();

    try {
        // Fetch directories and files for the current directory
        const directories = await dbFileManagerClient.listDirectories(directory);
        const files = await dbFileManagerClient.listFiles(directory);

        // Create an array to store the result
        const result = [];

        // Add subdirectories to the result
        for (const subdirectory of directories) {
            const subdirectoryPath = subdirectory.directory;
            const subdirectoryTree = await buildFileSystemTree(subdirectoryPath);
            result.push({
                isDirectory: true,
                name: subdirectory.directory.replace("/", ""),
                child: subdirectoryTree,
            });
        }

        // Add files to the result
        const filesArray = files.map(file => ({
            isDirectory: false,
            name: file,
        }));

        // Combine subdirectories and files in the result
        return result.concat(filesArray);
    } catch (error) {
        console.error('Error building file system tree:', error);
        throw error;
    }
}

// Example usage
buildFileSystemTree('/')
    .then(result => {
        localStorage.setItem('fileSystemTree', JSON.stringify(result));
    })
    .catch(error => {
        console.error('Error:', error);
    });
fileSystemTree = JSON.parse(localStorage.getItem("fileSystemTree"));
class HistoryStack {
    #items;
    constructor() {
        this.#items = []
    }
    push(item) {
        this.#items.push(item)
    }
    pop() {
        return this.#items.pop()
    }
    peek() {
        return this.#items[this.#items.length - 1]
    }
    isEmpty() {
        return this.#items.length === 0
    }
    size() {
        return this.#items.length
    }
    print() {
        console.log(this.#items.join(', '))
    }
}
let prePaths = new HistoryStack()
let forPaths = new HistoryStack()
let fileSystem = fileSystemTree;
let selected_item = {
    item: {},
    index: 0
};
initFileManager('root/');

function initFileManager(path, config = {
    keepHistory: true,
    callback: resetContextMenu
}) {
    document.querySelector('.folder-path-input').value = path;
    if (config.keepHistory) prePaths.push(path)
    let fileSys = JSON.parse(JSON.stringify(fileSystem));
    let pathArr = path.split('/')
    if ((pathArr[0] != 'root')) return newToast('error', '404 | Path doesn\'t exist!', (close) => setTimeout(() => close(), 5000))
    let flag = 0;
    for (let i = 1; i < pathArr.length; i++) {
        if (pathArr[i]) {
            for (const folder in fileSys) {
                if (fileSys[folder].name == pathArr[i]) {
                    fileSys = fileSys[folder].child;
                    flag++;
                    break;
                }
            }
        }
    }
    if ((pathArr.length - (pathArr[pathArr.length - 1] ? 1 : 2) != flag)) return newToast('error', '404 | Path doesn\'t exist!', (close) => setTimeout(() => close(), 5000))
    document.querySelector('.folderEmpty').style.display = (fileSys.length ? 'none' : 'block')
    setupFilemanager(fileSys)
    if (config.callback) config.callback();
}

function newItem(config = {
    isDirectory: true,
    name: 'unknown'
}) {
    let path = document.querySelector('.folder-path-input').value;
    if (!(path && config.name)) return newToast('error', 'Please fill out the name field!', (close) => setTimeout(() => close(), 5000))
    let fileSys = fileSystem;
    let pathArr = path.split('/')
    for (let i = 1; i < pathArr.length; i++) {
        if (pathArr[i]) {
            for (const folder in fileSys) {
                if (fileSys[folder].name == pathArr[i]) {
                    fileSys = fileSys[folder].child;
                    break;
                }
            }
        }
    }
    if (config.isDirectory) {
        fileSys.push({
            isDirectory: true,
            name: config.name,
            child: []
        })
    } else {
        fileSys.push({
            isDirectory: false,
            name: config.name,
        })
    }
    initFileManager(path, {
        keepHistory: false
    })
    newToast('success', 'Saved new ' + (config.isDirectory ? 'folder' : 'file') + ' "' + config.name + '"!', (close) => setTimeout(() => close(), 5000))
}

function renameItem(newName) {
    if (selected_item.item?.name) {
        let path = document.querySelector('.folder-path-input').value;
        let pathArr = path.split('/')
        let fileSys = fileSystem;
        for (let i = 1; i < pathArr.length; i++) {
            if (pathArr[i]) {
                for (const folder in fileSys) {
                    if (fileSys[folder].name == pathArr[i]) {
                        fileSys = fileSys[folder].child;
                        break;
                    }
                }
            }
        }
        fileSys[selected_item.index].name = newName;
        newToast('success', 'Changed file name into ' + selected_item.item.name + '!', (remove) => {
            setTimeout(() => {
                remove()
            }, 6000);
        })
        initFileManager(path, {
            keepHistory: false
        })
    }
}

function deleteItem() {
    if (selected_item.item?.name) {
        let path = document.querySelector('.folder-path-input').value;
        let pathArr = path.split('/')
        let fileSys = fileSystem;
        for (let i = 1; i < pathArr.length; i++) {
            if (pathArr[i]) {
                for (const folder in fileSys) {
                    if (fileSys[folder].name == pathArr[i]) {
                        fileSys = fileSys[folder].child;
                        break;
                    }
                }
            }
        }
        newToast('success', `Deleted ${selected_item.item.isDirectory?'folder':'file'} "${selected_item.item.name}"!`, (remove) => {
            setTimeout(() => {
                remove()
            }, 6000);
        })
        fileSys.splice(selected_item.index, 1);
        if(selected_item.item.isDirectory){
            
        dbFileManagerClient.deleteDirectory(selected_item.item.name);
    }else{
        let folderPath = document.querySelector('.folder-path-input').value;
        folderPath = folderPath.trim();
        folderPath = folderPath.replace(/^\/+/, '');
        folderPath = '/' + folderPath.replace(/\/+$/, '').replace("root/","/");
        dbFileManagerClient.deleteFile(selected_item.item.name,folderPath);
    }
        initFileManager(path, {
            keepHistory: false
        })
    }
}

function setupFilemanager(fileSystem) {
    filesContainer = document.querySelector('.filemanager-container-row');
    filesContainer.innerHTML = ''
    resetHistoryBtn()
    for (const fileItem in fileSystem) {
        let div = document.createElement("div")
        div.setAttribute('title', fileSystem[fileItem].name)
        if (fileSystem[fileItem].isDirectory) {
            div.classList.add('folder')
            div.addEventListener('dblclick', (e) => {
                let toPath = document.querySelector('.folder-path-input').value + fileSystem[fileItem].name
                initFileManager(toPath + '/');
            })
            div.innerHTML += `
            <div class="folder-icon-container">
            <div class="folder-icon"></div>
            </div>
            <p class="folder-name">${fileSystem[fileItem].name}</p>
            `
        } else {
            // div.addEventListener('dblclick',(e)=>{})
            div.classList.add('file')
            let fileIcon = getFileIconMeta(fileSystem[fileItem])
            div.innerHTML += `
                    <div class="doc-icon-container">
                        <div class="doc-icon" style="--icon-color: ${fileIcon.color};"><p>${fileIcon.ext}</p></div>
                    </div>
                    <p class="file-name">${fileSystem[fileItem].name}</p>
            `
        }
        filesContainer.appendChild(div)
        div.addEventListener('click', (e) => {
            // selected_item=document.querySelector('.folder-path-input').value+fileSystem[fileItem].name
            selected_item.index = fileItem;
            selected_item.item = fileSystem[fileItem];
            document.querySelector('.item-selected')?.classList.remove('item-selected')
            div.classList.add('item-selected')
        })
    }
}

function getFileIconMeta(file) {
    let ext = file.name.split('.')[file.name.split('.').length - 1];
    let color = '116, 116, 116'
    switch (ext) {
        case 'txt':
            color = '36, 230, 149'
            break;

        case 'html':
            color = '36, 230, 149'
            break;

        case 'php':
            color = '108, 74, 201'
            break;

        case 'zip':
            color = '190, 173, 16'
            break;

        case 'svg':
            color = '36, 230, 149'
            break;

        default:
            ext = '.?'
            break;
    }
    return {
        ext: ext.toUpperCase(),
        color
    }
}

function backward() {
    if (!prePaths.isEmpty()) {
        let currPath = prePaths.pop()
        forPaths.push(currPath)
        initFileManager(prePaths.peek(), {
            keepHistory: false
        })
    }
}

function forward() {
    if (!forPaths.isEmpty()) {
        let currPath = forPaths.pop()
        prePaths.push(currPath)
        initFileManager(currPath, {
            keepHistory: false
        })
    }
}

function resetHistoryBtn() {
    if ((prePaths.size() - 1) == 0) {
        document.getElementById('backwardBtn').setAttribute('disabled', true)
    } else {
        document.getElementById('backwardBtn').removeAttribute('disabled')
    }
    if (forPaths.isEmpty()) {
        document.getElementById('forwardBtn').setAttribute('disabled', true)
    } else {
        document.getElementById('forwardBtn').removeAttribute('disabled')
    }
}

function openModel(modelFor) { //'newFile' 
    document.querySelector('.popup').style.display = 'flex'
    document.querySelector('.popup >.popup-bg').addEventListener('click', () => document.querySelector('.popup').style.display = 'none')
    if (modelFor == 'newFile') {
        document.querySelector('.popup h1').innerHTML = 'New file'
        let input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('placeholder', 'Filename')
        let textArea = document.createElement('textarea');
        textArea.style.height = '129px';
        textArea.style.width = '286px';
        textArea.setAttribute('placeholder', 'Content');

        // You can set additional attributes if needed
        textArea.setAttribute('rows', '4');  // Set the number of rows

        // Now you can append the textarea to the desired parent element in your HTML
        // For example, assuming there's a container with class 'content-container'
        
        let saveButton = document.createElement('button')
        saveButton.style = 'background-color: rgb(1, 158, 111);';
        saveButton.innerHTML = 'Save';
        document.querySelector('.popup form').innerHTML = ''
        document.querySelector('.popup form').appendChild(input);
        document.querySelector('.popup form').appendChild(textArea);
        document.querySelector('.popup form').appendChild(saveButton);
        saveButton.addEventListener('click', () => {
            newItem(config = {
                isDirectory: false,
                name: input.value
            });
            let folderPath = document.querySelector('.folder-path-input').value;
            folderPath = folderPath.trim();
            folderPath = folderPath.replace(/^\/+/, '');
            folderPath = '/' + folderPath.replace(/\/+$/, '').replace("root/","/");

            dbFileManagerClient.createFile(input.value,textArea.value,folderPath.replace("root/","/"));
            document.querySelector('.popup').style.display = 'none'
        })
    }
    if (modelFor == 'newFolder') {
        document.querySelector('.popup h1').innerHTML = 'New Folder'
        let input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('placeholder', 'Foldername')
        let saveButton = document.createElement('button')
        saveButton.style = 'background-color: rgb(1, 158, 111);';
        saveButton.innerHTML = 'Save';
        let textArea = document.createElement('textarea');
        textArea.style.height = '129px';
        textArea.style.width = '286px';
        textArea.setAttribute('placeholder', 'Description of the content ... :-)');

        // You can set additional attributes if needed
        textArea.setAttribute('rows', '4');  // Set the number of rows
        document.querySelector('.popup form').innerHTML = ''
        document.querySelector('.popup form').appendChild(input);
        document.querySelector('.popup form').appendChild(saveButton);
        document.querySelector('.popup form').appendChild(textArea);
        saveButton.addEventListener('click', () => {
            newItem(config = {
                isDirectory: true,
                name: input.value
            });
            let folderPath = document.querySelector('.folder-path-input').value;
            folderPath = folderPath.trim();

            dbFileManagerClient.createDirectory('/' +input.value,textArea.value,folderPath.replace("root/","/"));
            document.querySelector('.popup').style.display = 'none'
        })
    }
    if (modelFor === 'export') {
        // Collect input from the user or use your own logic to get the required information
        /*let currentDirectoryPath = document.querySelector('.folder-path-input').value;
        currentDirectoryPath = currentDirectoryPath.replace('root/', '');
        const itemInfo = selected_item.item;*/
        const directory = itemInfo.name;
        const targetPath = prompt('Enter the target path:');
        // Display the popup
        document.querySelector('.popup').style.display = 'flex';

        // Update the popup header for directory export
        document.querySelector('.popup h1').innerHTML = 'Export Directory';

        // Close the popup when the close button is clicked
        const closeModal = document.querySelector('.popup-bg');
        closeModal.addEventListener('click', () => {
            document.querySelector('.popup').style.display = 'none';
        });

        // Call the exportDirectory function with the entered parameters
        if (directory !== null && targetPath !== null) {
            dbFileManagerClient.exportDirectory(directory, targetPath)
                .then(response => {
                    // Handle the response asynchronously
                    handleExportDirectoryResponse(response);
                })
                .catch(error => {
                    console.error('Error in exportDirectory request:', error);
                    // Handle error if needed
                });
        }
    }
    if (modelFor === 'afficher') {
        // Collect input from the user or use your own logic to get the required information
        let currentDirectoryPath = document.querySelector('.folder-path-input').value;

        // Replace "/root" with an empty string
        currentDirectoryPath = currentDirectoryPath.replace('root/', '');
        const directory = '/'+currentDirectoryPath;
        const filename = selected_item.item.name; 

        // Display the popup
        document.querySelector('.popup').style.display = 'flex';

        // Update the popup header for the 'afficher' operation
        document.querySelector('.popup h1').innerHTML = 'Afficher Files';

        // Close the popup when the close button is clicked
        const closeModal = document.querySelector('.popup-bg');
        closeModal.addEventListener('click', () => {
            document.querySelector('.popup').style.display = 'none';
        });

        // Call the Reading function with the entered parameters
        if (directory !== null && filename !== null) {
            dbFileManagerClient.readFile(filename,directory)
                .then(response => {
                    // Handle the response asynchronously
                    handleAfficherFileResponse(response.content);
                })
                .catch(error => {
                    console.error('Error in Reading request:', error);
                    // Handle error if needed
                });
        }
    }

    // Function to handle the 'afficher' operation response for reading a file
    function handleAfficherFileResponse(response) {
        // Assuming response is the content of the file
        const fileContent = response;

        // Add your logic to handle the 'afficher' operation results asynchronously
        console.log('File Content:', fileContent);

        // Update the popup content to show the 'afficher' operation results
        document.querySelector('.popup h1').innerHTML = 'Afficher File Results';
        const popupContent = document.createElement('div');
        popupContent.innerHTML = '<h3>File Content:</h3>';

        // Display the content of the file
        const fileContentParagraph = document.createElement('p');
        fileContentParagraph.textContent = fileContent;
        popupContent.appendChild(fileContentParagraph);

        document.querySelector('.popup form').innerHTML = '';
        document.querySelector('.popup form').appendChild(popupContent);
    }

    // Function to handle the 'afficher' operation response
    function handleAfficherResponse(response) {
        // Assuming response is an object with files property
        const {
            files
        } = response;

        // Add your logic to handle the 'afficher' operation results asynchronously
        console.log('Files:', files);

        // Update the popup content to show the 'afficher' operation results
        document.querySelector('.popup h1').innerHTML = 'Afficher Results';
        const popupContent = document.createElement('div');
        popupContent.innerHTML = '<h3>Files:</h3>';

        // Create a list to display the files
        const fileList = document.createElement('ul');
        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            fileList.appendChild(listItem);
        });

        popupContent.appendChild(fileList);

        document.querySelector('.popup form').innerHTML = '';
        document.querySelector('.popup form').appendChild(popupContent);
    }

    // Function to handle the exportDirectory response
    function handleExportDirectoryResponse(response) {
        // Assuming response is an object with success and message properties
        const {
            success,
            message
        } = response;

        // Add your logic to handle the exportDirectory results asynchronously
        console.log('Export Directory Success:', success);
        console.log('Message:', message);

        // Update the popup content to show the exportDirectory results
        document.querySelector('.popup h1').innerHTML = 'Export Directory Results';
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
            <p><strong>Success:</strong> ${success}</p>
            <p><strong>Message:</strong> ${message}</p>
            <!-- Add more details as needed -->
        `;
        document.querySelector('.popup form').innerHTML = '';
        document.querySelector('.popup form').appendChild(popupContent);
    }

    if (modelFor == 'rename') {
        if (selected_item.item?.name) {

            document.querySelector('.popup h1').innerHTML = 'Rename'
            let input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('placeholder', (selected_item.item.isDirectory ? 'Folder' : 'File') + ' name (' + selected_item.item.name + ')')
            input.value = selected_item.item.name;
            let saveButton = document.createElement('button')
            saveButton.style = 'background-color: rgb(1, 158, 111);';
            saveButton.innerHTML = 'Save';
            document.querySelector('.popup form').innerHTML = ''
            document.querySelector('.popup form').appendChild(input);
            document.querySelector('.popup form').appendChild(saveButton);
            
            saveButton.addEventListener('click', () => {
                renameItem(input.value);
                let currentDirectoryPath = document.querySelector('.folder-path-input').value;
                currentDirectoryPath = currentDirectoryPath.replace('root/', '');
                let directory = '/'+currentDirectoryPath;
                dbFileManagerClient.renameItem(selected_item.item.name,input.value,directory,selected_item.item.isDirectory);
                document.querySelector('.popup').style.display = 'none'
            })
        } else {
            document.querySelector('.popup').style.display = 'none'
            newToast('error', 'Please select a File or Folder which you want to rename!', (remove) => {
                setTimeout(() => {
                    remove()
                }, 6000);
            })
        }
    }
    if (modelFor === 'chercher') {
        // Display the popup
        document.querySelector('.popup').style.display = 'flex';

        // Update the popup header for the search


        // Close the popup when the close button is clicked
        const closeModal = document.querySelector('.popup-bg');
        closeModal.addEventListener('click', () => {
            document.querySelector('.popup').style.display = 'none';
        });

        // Prompt for search input
        const searchQuery = prompt('Enter your search query:');

        // Call the search function with the entered query
        if (searchQuery !== null) {
            // Assuming the search function returns a promise
            dbFileManagerClient.search(searchQuery)
                .then(response => {
                    // Handle the response asynchronously
                    handleSearchResponse(response);

                })
                .catch(error => {
                    console.error('Error in search:', error);
                    // Handle error if needed
                });
        }
    }
    async function handleinfoResponse(response) {
        // Assuming response is an object with properties for the item information
        const {
            id,
            title,
            content,
            directory,
            parent_id,
            owner
        } = response;

        // Get the popup header element
        const popupHeader = document.querySelector('.popup h1');

        // Update the popup header text for the item information
        popupHeader.textContent = 'Item Information';

        // Create HTML content to display the item information
        const infoHtml = `
    <p><strong>ID:</strong> ${id}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Content:</strong> ${content}</p>
    <p><strong>Directory:</strong> ${directory}</p>
    <p><strong>Parent ID:</strong> ${parent_id !== null ? parent_id : 'None'}</p>
    <p><strong>Owner:</strong> ${owner}</p>
`;

        // Set the popup header HTML content
        popupHeader.innerHTML = infoHtml;

        // Display the popup
        document.querySelector('.popup').style.display = 'flex';

    }

    // Function to handle the search response
    async function handleSearchResponse(response) {
        // Assuming response is an object with directories and files properties
        const {
            directories,
            files
        } = response;

        // Get the popup header element
        const popupHeader = document.querySelector('.popup h1');

        // Update the popup header text for the search
        popupHeader.textContent = 'Search Results';

        // Create a string to represent the directories and files
        let resultHtml = '<p>Directories:</p>';
        if (directories.length > 0) {
            resultHtml += '<ul>';
            directories.forEach(directory => {
                resultHtml += `<li>ID: ${directory.id}, Title: ${directory.title}, Directory: ${directory.directory}</li>`;
            });
            resultHtml += '</ul>';
        }

        resultHtml += '<p>Files:</p>';
        if (files.length > 0) {
            resultHtml += '<ul>';
            files.forEach(file => {
                resultHtml += `<li>${file}</li>`;
            });
            resultHtml += '</ul>';
        }

        // Set the popup header HTML content
        popupHeader.innerHTML = resultHtml;

        // Display the popup
        document.querySelector('.popup').style.display = 'flex';

        // For example, you can update the UI with the search results
        // ...
    }

    if (modelFor === 'info') {
        const itemInfo = selected_item.item;
        const currentDirectoryPath = document.querySelector('.folder-path-input').value;
        console.log('Current Directory Path:', currentDirectoryPath);
        // Display the info modal
        // Assume 'selected_item.item' contains the information about the selected item


        // Update the modal content with item information

        dbFileManagerClient.info('/' + itemInfo.name).then(response => {

                // Check if response is defined and has the expected properties
                if (response && response.id !== undefined && response.title !== undefined) {
                    // Handle the response asynchronously
                    const infoDetails = document.querySelector('.popup h1');
                    handleinfoResponse(response);
                } else {
                    console.error('Invalid response format:', response);
                    // Handle the error or show a message accordingly
                }
            })
            .catch(error => {
                console.error('Error in info request:', error);
                const popupHeader = document.querySelector('.popup h1');
                popupHeader.textContent = 'Its available for files :-)';
                // Handle error if needed
            });


    };
    if (modelFor == 'delete') {
        if (selected_item.item?.name) {

            document.querySelector('.popup h1').innerHTML = 'Sure to delete?'
            let saveButton = document.createElement('button')
            let cancelButton = document.createElement('button')
            saveButton.style = 'background-color: rgb(1, 158, 111);';
            saveButton.innerHTML = 'Yes';
            cancelButton.innerHTML = 'Cancel';
            document.querySelector('.popup form').innerHTML = ''
            // document.querySelector('.popup form').appendChild(input); 
            document.querySelector('.popup form').appendChild(saveButton);
            document.querySelector('.popup form').appendChild(cancelButton);
            saveButton.focus()
            saveButton.addEventListener('click', () => {
                deleteItem();
                document.querySelector('.popup').style.display = 'none'
            })
            cancelButton.addEventListener('click', () => {
                document.querySelector('.popup').style.display = 'none'
            })
        } else {
            document.querySelector('.popup').style.display = 'none'
            newToast('error', 'Please select a File or Folder which you want to delete!', (remove) => {
                setTimeout(() => {
                    remove()
                }, 6000);
            })
        }
    }
}

function newToast(sts, message, cb) {
    sts = (sts == 'success' ? 'toast-sccess' : (sts == 'error' ? 'toast-dnger' : 'toast-inf'));
    let tContainer = document.querySelector('.toast-messages')
    let c = document.createElement('div')
    let bc = document.createElement('div')
    let p = document.createElement('p')
    let b = document.createElement('button')
    c.classList.add('toast-container', sts)
    // c.setAttribute('id','sjdfnksjdfn');
    p.innerText = message;
    b.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    b.addEventListener('click', removeToast);
    c.appendChild(p)
    bc.appendChild(b)
    c.appendChild(bc)
    tContainer.prepend(c)
    setTimeout(() => {
        c.style.opacity = '1'
    }, 300);

    function removeToast() {
        c.style = `
            opacity:0;
        `
        setTimeout(() => {
            c.remove()
        }, 500);
    }
    if (cb) cb(removeToast);
}

newToast('info', 'Welcome: in testing mode...', (remove) => {
    setTimeout(() => {
        remove()
    }, 10000);
})
window.addEventListener('focus', () => {

    newToast('info', 'Welcome back!', (remove) => {
        setTimeout(() => {
            remove()
        }, 3000);
    })
})
window.addEventListener('blur', (e) => {
    newToast('info', 'Seems you gone!', (remove) => {
        e.target.addEventListener('focus', () => {
            setTimeout(() => {
                remove()
            }, 1200);
        })
    })
})