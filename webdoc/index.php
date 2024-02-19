<?php
session_start();

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    // User is logged in
    
    $userId = $_SESSION["id"];
    $username = $_SESSION["username"];
    $userrole = $_SESSION["role"];
    header("Location: dashboard.php");
} else {
   
    echo '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Not Logged In</title>
        <style>
            body {
                font-family: \'Arial\', sans-serif;
                background-color: #f4f4f4;
                color: #333;
                text-align: center;
                margin: 0;
                padding: 0;
            }
    
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }
    
            .logo {
                font-size: 3rem;
                color: #3498db;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 1.5rem;
                margin-bottom: 20px;
            }
    
            .login-link {
                display: inline-block;
                background-color: #3498db;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
    
            .login-link:hover {
                background-color: #2980b9;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">Central management system (pfe edition)</div>
            <div class="message">
                <p>You are not logged in.</p>
                <p>Please log in to access the content.</p>
            </div>
            <a href="login.php" class="login-link">Log In</a>
        </div>
    </body>
    </html>';
    exit;
        }
?>

