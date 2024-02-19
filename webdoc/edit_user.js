import { DatabaseFileManagerClient } from "./router.js";

document.addEventListener("DOMContentLoaded", function () {
    
    // Fetch and populate the user dropdown dynamically
    const userIdSelect = document.getElementById("userId");
    const dbFileManagerClient = new DatabaseFileManagerClient();

    dbFileManagerClient.listUsers(() => {

    }).then(response => {
        // Handle successful response
        response.forEach(user => {
            const option = document.createElement("option");
            option.value = user.userId;
            option.textContent = user.username;
            userIdSelect.appendChild(option);
        });
    }).catch(error => {
        // Handle error
        console.error(error);
    });
    
});
