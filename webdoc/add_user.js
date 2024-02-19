// Import the DatabaseFileManagerClient class
import { DatabaseFileManagerClient } from 'router.js';

// Initialize an instance of the DatabaseFileManagerClient
const dbFileManagerClient = new DatabaseFileManagerClient();

// Function to handle the form submission
function handleFormSubmission(event) {
    event.preventDefault();
    alert(0);
    // Retrieve form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;

    // Perform any additional validation if needed

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Call the addUser method
    dbFileManagerClient.addUser(username, password, role, email,"/", (error, result) => {
        if (error) {
            console.error('Error adding user:', error);
            alert('Error adding user. Please try again.');
        } else {
            console.log('User added successfully:', result);
            alert('User added successfully.');
            // Optionally, you can redirect or perform other actions upon successful user addition
        }
    });
}

// Attach the handleFormSubmission function to the form's submit event
document.querySelector('form').addEventListener('submit', handleFormSubmission);