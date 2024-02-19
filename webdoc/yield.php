<?php
if (!(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == TRUE)) {
    echo '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>User Stats</title>
    
</head>
<body>
    <style>
        /* Additional styles for user stats container and sidebar */
        #userStatsContainer {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .userStatsCard {
            width: 200px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-align: center;
        }

        /* Sidebar styles */
        #sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            padding-top: 20px;
        }

        .sidebar {
            background-color: #f8f9fa;
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

        <!-- User Stats Container -->
        <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h2>User Stats</h2>
            <div id="userStatsContainer" class="d-flex flex-wrap gap-3"></div>
        </div>
    </div>
</div>
<script type="module" src="yield.js"></script>
</body>
</html>
';
  }else{
    echo "<script>" . "window.location.href='./'" . "</script>";
    exit;
  }
?>

