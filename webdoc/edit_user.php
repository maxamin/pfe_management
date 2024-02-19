<?php
if (!(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == TRUE)) {
    
echo '
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Modify User</title>
    <script type="module" src="edit_user.js"></script>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    
    <style>
        /* Additional styles for user stats container and sidebar */
        .container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        #modifyUserForm {
            width: 300px;
            margin-left: 20px;
        }

        #sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            padding-top: 20px;
            width: 200px;
            background-color: #f8f9fa;
        }

        .nav-link {
            color: #000;
        }

        .nav-link.active {
            font-weight: bold;
            color: #007bff;
        }
    </style>

    <div class="container">
        <!-- Sidebar -->
        <nav id="sidebar">
            <div class="position-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="dashboard.php">
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="add_user.php">
                            Ajouter un utilisateur
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="edit_user.php">
                            Modify User
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="yield.php">
                            Statistiques
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="modifyUserForm">
            <h2 class="mb-4">Modify User</h2>

            <form>
                <!-- List of Users -->
                <div class="mb-3">
                    <label for="userId" class="form-label">Select User</label>
                    <select class="form-select" id="userId" name="userId" required>
                        <!-- Populate this dropdown dynamically using JavaScript -->
                    </select>
                </div>

                <!-- User Details -->
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>

                <div class="mb-3">
                    <label for="departement" class="form-label">departement</label>
                    <input type="text" class="form-control" id="departement" name="departement" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">email</label>
                    <input type="text" class="form-control" id="email" name="email" required>
                </div>

                <div class="mb-3">
                    <label for="associatedDirectories" class="form-label">Associated Directories</label>
                    <input type="text" class="form-control" id="associatedDirectories" name="associatedDirectories"
                        required>
                </div>

                <button type="button" class="btn btn-primary" onclick="DatabaseFileManagerClient.getUserDetails()">Get User Details</button>
                <button type="button" class="btn btn-success" onclick="modifyUser_fromhtml()">Modify User</button>
            </form>
        </div>
    </div>
    <script type="module" src="./router.js">alert(1);</script>
    <!-- Bootstrap JS and Popper.js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Your script to populate the user dropdown and handle modifications -->
    

</body>

</html>
';
exit;

  }else{
    echo "<script>" . "window.location.href='./'" . "</script>";
    exit;
  }
?>
