<?php
// Include the DatabaseFileManager class
require_once "DBMI.php";

session_start(); // Start the session

if (__FILE__ == $_SERVER['PHP_SELF']) {
    // This file is being directly accessed
    echo "Direct access is not detected!";
    exit();
} else {
    // Check if the user is logged in
    if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == TRUE) {
        $dbFilePath = 'database.db';
        $username = $_SESSION["username"];
        
        $databaseManager = new DatabaseFileManager($dbFilePath);
        $userrole = $databaseManager->getUserRole($_SESSION["username"]);
        // Get other parameters from the URL
        $filename = $_GET['filename'] ?? '';
        $password = $_GET['password'] ?? '';
        $departement = $_GET['departement']?? '';
        $email = $_GET['email'] ?? '';
        $content = $_GET['content'] ?? '';
        $directory = $_GET['directory'] ?? '';
        $userId = $_SESSION["id"]??$_GET["id"];
        $username = $_GET["username"] ?? '';
        $oldName = $_GET['oldName'] ?? '';
        $newName = $_GET['newName'] ?? '';
        $userrole = $_GET["role"]?? $userrole;
        $associatedDirectories = $_GET['associatedDirectories'] ?? '';
        $targetPath = $_GET['targetPath'] ?? '';
        $parentDirectory=$_GET['parentDirectory']??'';
        $query = $_GET['query'] ?? '';
        $isdirectory=$_GET['isdirectory']??'';
        $requestedFunction = $_GET['function'] ?? '';

        // Call the appropriate function based on the 'function' parameter
        switch ($requestedFunction) {
            case 'role':
                echo $databaseManager->getUserRole($_SESSION["username"]);
                break;
            case 'me':
                echo json_encode(['username' => htmlspecialchars($_SESSION["username"])]);
                break;
            case 'listUsers':
                echo $databaseManager->listUsers();
                break;
            case 'createFile':
                $databaseManager->createFile($filename, $content, $directory, $userId);
                break;
            case 'rename':
                $databaseManager->renameItem($oldName, $newName, $directory,$isdirectory);
                break;
            case 'readFile':
                $databaseManager->readFile($filename, $directory);
                break;
            case 'writeFile':
                $databaseManager->writeFile($filename, $content, $directory);
                break;
            case 'deleteFile':
                $databaseManager->deleteFile($filename, $directory);
                break;
            case 'listFiles':
                echo $databaseManager->listFiles($directory);
                break;
            case 'createDirectory':
                $databaseManager->createDirectory($directory,$content, $parentDirectory,$userId);
                break;
            case 'listDirectories':
                $databaseManager->listDirectories($parentDirectory);
                break;
            case 'deleteDirectory':
                $databaseManager->deleteDirectory($directory);
                break;
            case 'info':
                $databaseManager->info($directory);
                break;
            case 'removeUser':
                $databaseManager->removeUser($userId);
                break;
            case 'modifyUser':
                $databaseManager->modifyUser($userId, $username, $password, $departement, $email, $associatedDirectories);
                break;
            case 'addUser':
                $databaseManager->addUser($username, $password, $departement, $email, $associatedDirectories);
                break;
            case 'getUser':
                $databaseManager->getUser($username);
                break;
            case 'exportDirectory':
                $databaseManager->exportDirectory($directory, $targetPath, $userId);
                break;
            case 'getUserStats':
                print_r($databaseManager->getUserStats());
                break;
            case 'search':
                $databaseManager->search($query);
                break;
            default:
                // Handle invalid function or provide a default action
                echo json_encode(['error' => 'Invalid function specified.']);
                break;
        }
    } else {
        echo json_encode(['error' => 'User not logged in. Access denied.']);
    }
}
?>
