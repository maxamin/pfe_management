<?php

class DatabaseFileManager {
    private $pdo;

    public function __construct($dbFilePath) {#HN
        try {

            
            // Establish a connection to the SQLite database file
            $this->pdo = new PDO("sqlite:$dbFilePath");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Execute SQL file to set up the initial database schema
            
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
    private function respond($data) {
        // Set the Content-Type header to indicate JSON response
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    public function createFile($filename, $content = '', $directory = '/', $owner=1) {
        $filename = rtrim($filename, '/');
        $directory = rtrim($directory, '/');
        $filename = str_replace('//', '/', $filename);
        $directory = str_replace('//', '/', $directory);
        $stmt = $this->pdo->prepare("INSERT INTO files (filename, content, directory, owner) VALUES (:filename, :content, :directory, :owner)");
        $stmt->bindParam(':filename', $filename);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':directory', $directory);
        $stmt->bindParam(':owner', $owner);

        // Check if the execution was successful
        $success = $stmt->execute();

        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }
    public function directory_id($directoryName) {
        if ($directoryName[0] !== '/') {
            $directoryName = '/' . $directoryName;
        }
        
        
        try {
            $stmt = $this->pdo->prepare("SELECT id FROM directories WHERE directory LIKE :directory");
            $stmt->bindParam(':directory', $directoryName);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($result && isset($result['id'])) {
                
                return $result['id'];
            } else {
                // Return an error message or handle the situation as needed
                return null;
            }
        } catch (PDOException $e) {
            // Handle database connection or query errors
            // You might want to log the error or return an appropriate value
            return null;
        }
    }

    public function readFile($filename, $directory = '/') {
        $filename = rtrim($filename, '/');
        $directory = rtrim($directory, '/');
        $filename = str_replace('//', '/', $filename);
        $directory = str_replace('//', '/', $directory);
        $stmt = $this->pdo->prepare("SELECT content FROM files WHERE filename = :filename AND directory = :directory");
        $stmt->bindParam(':filename', $filename);
        $stmt->bindParam(':directory', $directory);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return result as JSON
        //header('Content-Type: application/json');
        echo $this->respond($result);
    }

    public function writeFile($filename, $content, $directory = '/') {
        $filename = rtrim($filename, '/');
        $directory = rtrim($directory, '/');
        $filename = str_replace('//', '/', $filename);
        $directory = str_replace('//', '/', $directory);
        $stmt = $this->pdo->prepare("UPDATE files SET content = :content WHERE filename = :filename AND directory = :directory");
        $stmt->bindParam(':filename', $filename);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':directory', $directory);

        // Check if the execution was successful
        $success = $stmt->execute();

        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }

    public function deleteFile($filename, $directory = '/') {
        $filename = rtrim($filename, '/');
        $directory = rtrim($directory, '/');
        $directory = str_replace('//', '/', $directory);
        $filename = str_replace('//', '/', $filename);
        $path = $directory;
        $directory = basename($directory);
        // Modify the regular expression pattern to capture the directory before "www"
        $pattern = '/\/([^\/]+)\/'.$directory.'/';
        if (preg_match($pattern, $path, $matches)) {
            $varPart = $matches[1];
            
            $pid=$this->directory_id($varPart);
            
            $stmtz = $this->pdo->prepare("SELECT directory FROM directories WHERE parent_id = :pid");
            $stmtz->bindParam(':pid', $pid);
            $result = $stmtz->execute();
            $result = $stmtz->fetchAll(PDO::FETCH_ASSOC);
            if($result[0]['directory']!=="/".$directory){
                exit;
            }
        }
        
        $stmt = $this->pdo->prepare("DELETE FROM files WHERE filename = :filename AND directory = :directory");
        $stmt->bindParam(':filename', $filename);
        $stmt->bindParam(':directory', $result[0]['directory']);
        // Check if the execution was successful
        $success = $stmt->execute();

        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        //echo $this->respond($response);
    }

    public function listFiles($directory = '/') {
        $stmt = $this->pdo->prepare("SELECT filename FROM files WHERE directory = :directory");
        $stmt->bindParam(':directory', $directory);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_COLUMN);

        // Return result as JSON
        //header('Content-Type: application/json');
        echo $this->respond($result);
    }
    public function renameItem($oldName, $newName, $directory = '/',$isDirectory=true) {
        // Determine if it's a file or directory based on your database structure
        // For example, you might have a 'files' table with a column 'is_directory'
        $directory = rtrim($directory, '/');
        $directory = str_replace('//', '/', $directory);
        if ($directory[0] !== '/') {
            $directory = '/' . $directory;
        }
        // Assuming you have a column 'is_directory' to distinguish between files and directories
    
        // Check if the item (file or directory) exists
        if ($isDirectory !== true) {
            // Update the name in the database
            
            $updateStmt = $this->pdo->prepare("UPDATE files SET filename = :newName WHERE directory = :directory AND filename = :oldName");
            $updateStmt->bindParam(':directory', $directory);
            $updateStmt->bindParam(':oldName', $oldName);
            $updateStmt->bindParam(':newName', $newName);
            $updateStmt->execute();
    
            // Return a success response
            $response = array('success' => true, 'message' => 'Item renamed successfully');
            echo $this->respond($response);
        } else {
            $updateStmt = $this->pdo->prepare("UPDATE directories SET directory = :newName WHERE directory = :oldName");
            $updateStmt->bindParam(':directory', $directory);
            $updateStmt->bindParam(':oldName', $oldName);
            $updateStmt->bindParam(':newName', $newName);
            $updateStmt->execute();
    
            // Return a success response
            $response = array('success' => true, 'message' => 'Item renamed successfully');
            echo $this->respond($response);
        }
    }
    

    public function createDirectory($directory, $Content,$parentDirectory='/', $owner=1) {
        $title = basename($directory);
        $parentDirectory_id=$this->directory_id(basename($parentDirectory));
        echo $parentDirectory_id;
        $stmt = $this->pdo->prepare("INSERT INTO directories (directory, title,content,parent_id, owner) VALUES (:directory, :title,:content,:parent_id, :owner)");
        $stmt->bindParam(':directory', $directory);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $Content);
        $stmt->bindParam(':parent_id',$parentDirectory_id);
        $stmt->bindParam(':owner', $owner);

        // Check if the execution was successful
        $success = $stmt->execute();

        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }
    public function listDirectories($parentDirectory = '/') {
        $parent_id=$this->directory_id($parentDirectory);
        $stmt = $this->pdo->prepare("SELECT id, directory FROM directories WHERE parent_id = :parent_id");
        $stmt->bindParam(':parent_id', $parent_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return result as JSON
        //header('Content-Type: application/json');
        echo $this->respond($result);
    }

    public function deleteDirectory($directory_t) {
        $directory=$directory_t;
        $parent_id=$this->directory_id($directory);
        // Delete files in the directory
        $stmtFiles = $this->pdo->prepare("DELETE FROM files WHERE directory LIKE :directory");
        $stmtFiles->bindParam(':directory', $directory);
        $stmtFiles->execute();
    
        // Delete subdirectories recursively
        $stmtSubdirectories = $this->pdo->prepare("DELETE FROM directories WHERE parent_id = :parent_id");
        $stmtSubdirectories->bindParam(':parent_id',  $parent_id);
        $stmtSubdirectories->execute();
    
        // Delete the directory itself
        $stmt = $this->pdo->prepare("DELETE FROM directories WHERE directory = :directory");
        $stmt->bindParam(':directory', $directory);
    
        // Check if the execution was successful
        $success = $stmt->execute();
    
        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }

    public function info($directory) {
        try {
            // Use a placeholder for the database connection ($this->pdo) in the constructor or elsewhere
    
            // Use a prepared statement with named placeholders to avoid SQL injection
            $stmt = $this->pdo->prepare("SELECT id, title, content, directory, parent_id, owner FROM directories WHERE directory = :directory");
    
            // Bind the parameter
            $stmt->bindParam(':directory', $directory);
    
            // Execute the query
            $stmt->execute();
    
            // Fetch the result as an associative array
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($result) {
                // Return result as JSON
                //header('Content-Type: application/json');
                echo $this->respond($result);
            } else {
                // Handle the case when no records are found
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['error' => 'Directory not found']);
            }
        } catch (PDOException $e) {
            // Handle database connection or query errors
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => 'Internal Server Error']);
        }
    }
    

    public function removeUser($userId) {
        $stmtUser = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
        $stmtUser->bindParam(':id', $userId);
        $successUser = $stmtUser->execute();

        $stmtAssocDir = $this->pdo->prepare("DELETE FROM user_directories WHERE user_id = :user_id");
        $stmtAssocDir->bindParam(':user_id', $userId);
        $successAssocDir = $stmtAssocDir->execute();

        // Delete files and directories owned by the user
        $stmtFiles = $this->pdo->prepare("DELETE FROM files WHERE owner = :owner");
        $stmtFiles->bindParam(':owner', $userId);
        $successFiles = $stmtFiles->execute();

        $stmtDirs = $this->pdo->prepare("DELETE FROM directories WHERE owner = :owner");
        $stmtDirs->bindParam(':owner', $userId);
        $successDirs = $stmtDirs->execute();

        // Check if all executions were successful
        $success = $successUser && $successAssocDir && $successFiles && $successDirs;

        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }


    public function modifyUser($userId, $username, $password, $departement, $email, $associatedDirectories = []) {
        if(is_string($associatedDirectories)){
            $temp=$associatedDirectories;
            $associatedDirectories=[$temp];
        }
        $hashedPassword = !empty($password) ? password_hash($password, PASSWORD_BCRYPT) : null;

        $stmtUser = $this->pdo->prepare("UPDATE users SET username = :username, password = :password, departement = :departement WHERE id = :id");
        $stmtUser->bindParam(':username', $username);
        $stmtUser->bindParam(':password', $hashedPassword);
        $stmtUser->bindParam(':departement', $departement);
        $stmtUser->bindParam(':id', $userId);
        $successUser = $stmtUser->execute();

        $stmtRemoveAssocDir = $this->pdo->prepare("DELETE FROM user_directories WHERE user_id = :user_id");
        $stmtRemoveAssocDir->bindParam(':user_id', $userId);
        $successAssocDirRemove = $stmtRemoveAssocDir->execute();

        $successAssocDirInsert = true;
        foreach ($associatedDirectories as $directory) {
            $stmtAssocDir = $this->pdo->prepare("INSERT INTO user_directories (user_id, directory) VALUES (:user_id, :directory)");
            $stmtAssocDir->bindParam(':user_id', $userId);
            $stmtAssocDir->bindParam(':directory', $directory);
            $successAssocDirInsert = $successAssocDirInsert && $stmtAssocDir->execute();
        }

        // Check if the execution was successful
        $success = $successUser && $successAssocDirRemove && $successAssocDirInsert;

        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }

    public function addUser($username, $password, $departement, $email, $associatedDirectories = []) {
        $stmtCheckEmail = $this->pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmtCheckEmail->bindParam(':email', $email);
        $stmtCheckEmail->execute();
        $countEmail = $stmtCheckEmail->fetchColumn();
        
        if ($countEmail > 0) {
            // Handle the case where the email already exists
            $response = ['success' => false, 'error' => 'Email already exists in the database.'];
            echo $this->respond($response);
            return;
        }
        if(is_string($associatedDirectories)){
            $temp=$associatedDirectories;
            $associatedDirectories=[$temp];
        }
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
        $stmtUser = $this->pdo->prepare("INSERT INTO users (username,email, password, departement ) VALUES (:username, :email,:password, :departement)");
        $stmtUser->bindParam(':username', $username);
        $stmtUser->bindParam(':password', $hashedPassword);
        $stmtUser->bindParam(':departement', $departement);
        $stmtUser->bindParam(':email', $email); // Bind the email parameter
    
        $successUser = $stmtUser->execute();
    
        $successAssocDirInsert = true;
        foreach ($associatedDirectories as $directory) {
            $stmtAssocDir = $this->pdo->prepare("INSERT INTO user_directories (user_id, directory) VALUES (:user_id, :directory)");
            $stmtAssocDir->bindParam(':user_id', $this->pdo->lastInsertId());
            $stmtAssocDir->bindParam(':directory', $directory);
            $successAssocDirInsert = $successAssocDirInsert && $stmtAssocDir->execute();
        }
    
        // Check if the execution was successful
        $success = $successUser && $successAssocDirInsert;
    
        // Return result as JSON
        $response = ['success' => $success];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }
    

    public function listUsers($snooze = true) {
        $stmt = $this->pdo->prepare("SELECT * FROM users");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Return results as JSON if $snooze is true
        if ($snooze) {
            // Set the Content-Type header to indicate JSON response
            header('Content-Type: application/json');
            echo $this->respond($results);
        } else {
            // Return the results array
            return $results;
        }
    }
    

    public function getUserRole($username) {
        $stmt = $this->pdo->prepare("SELECT departement FROM users WHERE username = :username");
        $trimmedUsername = trim($username);
        $stmt->bindParam(':username', $trimmedUsername);

        $stmt->execute();
        
        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // Check if the result is not empty
        if ($result && isset($result['departement'])) {
            
            return $result;
        } else {
            // Return an error message or handle the situation as needed
            return (['error' => 'db misconstructed']);
        }
    }
    
    
    public function getUser($username) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return result as JSON
        //header('Content-Type: application/json');
        
        echo $this->respond($result);
    }
    
    
    public function exportDirectory($directory, $targetPath, $owner) {
        $webRoot = $_SERVER['DOCUMENT_ROOT'];
        $targetFullPath = $webRoot . '/' . $targetPath;
    
        // Ensure the target directory exists or create it
        if (!file_exists($targetFullPath)) {
            mkdir($targetFullPath, 0774, true);
        }
    
        $stmtFiles = $this->pdo->prepare("SELECT filename, content FROM files WHERE directory = :directory AND owner = :owner");
        $stmtFiles->bindParam(':directory', $directory);
        $stmtFiles->bindParam(':owner', $owner);
        $stmtFiles->execute();
        $files = $stmtFiles->fetchAll(PDO::FETCH_ASSOC);
    
        $stmtDir = $this->pdo->prepare("SELECT title, content FROM directories WHERE directory = :directory AND owner = :owner");
        $stmtDir->bindParam(':directory', $directory);
        $stmtDir->bindParam(':owner', $owner);
        $stmtDir->execute();
        $directoryInfo = $stmtDir->fetch(PDO::FETCH_ASSOC);
    
        if ($directoryInfo) {
            $infoFile = fopen($targetFullPath . '/info.txt', 'w');
            fwrite($infoFile, "Title: " . $directoryInfo['title'] . "\n");
            fwrite($infoFile, "Content: " . $directoryInfo['content'] . "\n");
            fclose($infoFile);
        }
    
        foreach ($files as $file) {
            $filePath = $targetFullPath . '/' . $file['filename'];
            $fileContent = $file['content'];
    
            if (strpos($filePath, $targetFullPath) === 0) {
                file_put_contents($filePath, $fileContent);
            } else {
                throw new Exception("Invalid or unauthorized file path");
            }
        }
    
        // Return success as JSON
        $response = ['success' => true];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }
        
    public function getUserFilesCount($userId) {
            try {
                $stmt = $this->pdo->prepare("SELECT COUNT(*) AS filesCount FROM files WHERE owner = :userId");
                $stmt->bindParam(':userId', $userId);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
                return ($result) ? $result['filesCount'] : 0;
            } catch (PDOException $e) {
                // Handle database connection or query errors
                // You might want to log the error or return an appropriate value
                return -1;
            }
        }
        
    public function getUserDirectoriesCount($userId) {
            try {
                $intid =intval($userId);
                $stmt = $this->pdo->prepare("SELECT COUNT(*) AS directoriesCount FROM user_directories WHERE user_id = :userId");
                $stmt->bindParam(':userId', $intid);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
                return ($result) ? $result['directoriesCount'] : 0;
            } catch (PDOException $e) {
                // Handle database connection or query errors
                // You might want to log the error or return an appropriate value
                return -1;
            }
    }
    public function getUserStats() {
        $userStats = array();
        
        $users = $this->listUsers(false);
        
        // Calculate statistics for each user
        foreach ($users as $user) {
            $userId = $user['id'];
            $username = $user['username'];

            // Get user directories count
            $directoriesCount = $this->getUserDirectoriesCount($userId);

            // Get user files count
            $filesCount = $this->getUserFilesCount($userId);
            // Calculate user rank
            $userRank = $this->calculateUserRank($directoriesCount + $filesCount);

            // Ajouter un utilisateur stats to the array
            $userStats[] = array(
                'userId' => $userId,
                'username' => $username,
                'directoriesCount' => $directoriesCount,
                'filesCount' => $filesCount,
                'userRank' => $userRank
            );
        }

        // Sort user stats based on user rank (ascending order)
        usort($userStats, function ($a, $b) {
            return $a['userRank'] - $b['userRank'];
        });

            echo $this->respond($userStats);
    }

    private function calculateUserRank($totalCount) {
        // You can adjust the logic for determining user rank as needed
        // For example, you might want to define different thresholds for ranks
        // Here, we'll use a simple linear scale
        $stmt = $this->pdo->prepare("SELECT COUNT(*) AS directoriesCount FROM directories WHERE owner != 0");
        $stmt->execute();
        $dirc = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt = $this->pdo->prepare("SELECT COUNT(*) AS filesCount FROM files WHERE owner != 0");
        $stmt->execute();
        $filec = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $maxRank=$dirc["directoriesCount"]+$filec["filesCount"];
        // Calculate user rank based on totalCount
        return round(($totalCount / $maxRank) * 100);
    }
    public function search($query) {
        $stmtDirs = $this->pdo->prepare("SELECT * FROM directories WHERE title LIKE :query OR content LIKE :query");
        $stmtDirs->bindValue(':query', '%' . $query . '%');
        $stmtDirs->execute();
        $directories = $stmtDirs->fetchAll(PDO::FETCH_ASSOC);

        $stmtFiles = $this->pdo->prepare("SELECT * FROM files WHERE filename LIKE :query OR content LIKE :query");
        $stmtFiles->bindValue(':query', '%' . $query . '%');
        $stmtFiles->execute();
        $files = $stmtFiles->fetchAll(PDO::FETCH_ASSOC);

        // Return result as JSON
        $response = ['directories' => $directories, 'files' => $files];
        //header('Content-Type: application/json');
        echo $this->respond($response);
    }
}

