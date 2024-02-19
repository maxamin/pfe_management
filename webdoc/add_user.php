<?php
if (!(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == TRUE)) {
    echo '
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Ajouter un utilisateur</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <style>
        /* Additional styles for user stats container and sidebar */
        #apv {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center; /* Center items horizontally */
            align-items: center; /* Center items vertically */
            height: 100vh; /* Full viewport height */
        }

        .container-mt-5 {
            width: 100%; /* Full width for the container */
            max-width: 600px; /* Set a maximum width for better organization */
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-align: center;
        }

        #sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            padding-top: 20px;
            width: 200px; /* Adjusted width for the sidebar */
        }

        .sidebar {
            background-color: #f8f9fa;
            height: 100%; /* Full height for the sidebar */
            position: fixed;
        }
    </style>
    <div class="container-fluid">
        <div class="row">

            <!-- Sidebar -->
            <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
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
            <script type="module" src="add_user.js"></script>
            <div id="apv">
                <div class="container-mt-5">
                    <h2 class="mb-4">Ajouter un utilisateur</h2>

                    <form>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" name="username" required>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>

                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
                        </div>

                        <div class="mb-3">
                            <label for="role" class="form-label">Role</label>
                            <select class="form-select" id="role" name="role" required>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary" onclick="alert(1)"=>Ajouter un utilisateur</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Bootstrap JS and Popper.js -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>

</html>
';
exit;
  }else{
    echo "<script>" . "window.location.href='./'" . "</script>";
    exit;
  }


?>