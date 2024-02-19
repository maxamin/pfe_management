<?php
# Initialize session
session_start();

# Check if user is already logged in, If yes then redirect him to index page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == TRUE) {
  echo "<script>" . "window.location.href='./'" . "</script>";
  exit;
}

# Include connection
# Define variables and initialize with empty values
# Define variables and initialize with empty values
$user_login_err = $user_password_err = $login_err = "";
$user_login = $user_password = "";

# Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty(trim($_POST["user_login"]))) {
        $user_login_err = "Please enter your username or an email id.";
    } else {
        $user_login = trim($_POST["user_login"]);
    }

    if (empty(trim($_POST["user_password"]))) {
        $user_password_err = "Please enter your password.";
    } else {
        $user_password = trim($_POST["user_password"]);
    }

    # Validate credentials
    if (empty($user_login_err) && empty($user_password_err)) {
        # Set up the PDO connection
        $dsn = 'sqlite:database.db'; 
        $pdo = new PDO($dsn);

        # Prepare a select statement
        $sql = "SELECT id, username, password FROM users WHERE username = :user_login OR email = :user_login";

        if ($stmt = $pdo->prepare($sql)) {
            # Bind parameters
            $stmt->bindParam(":user_login", $param_user_login, PDO::PARAM_STR);

            # Set parameters
            $param_user_login = $user_login;

            # Execute the prepared statement
            if ($stmt->execute()) {
                # Fetch the result
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                # Check if user exists, If yes then verify password
                if ($result) {
                    $id = $result['id'];
                    $username = $result['username'];
                    $hashed_password = $result['password'];
                    //echo $hashed_password;
                    # Check if password is correct                    
                    if (password_verify($user_password,$hashed_password)) {
                        
                        # Store data in session variables
                        $_SESSION["id"] = $id;
                        $_SESSION["username"] = $username;
                        $_SESSION["loggedin"] = true;

                        # Redirect user to index page
                        header("location: ./welcome.php");
                        exit;
                    } else {
                        # If password is incorrect show an error message
                        $login_err = "The email or password you entered is incorrect.";
                    }
                } else {
                    # If user doesn't exist show an error message
                    $login_err = "Invalid username or password.";
                }
            } else {
                echo "<script>" . "alert('Oops! Something went wrong. Please try again later.');" . "</script>";
                echo "<script>" . "window.location.href='./login.php'" . "</script>";
                exit;
            }

            # Close statement
            $stmt = null;
        }

        # Close the PDO connection
        $pdo = null;
    }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User login system</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/main.css">
  <link rel="shortcut icon" href="./img/favicon-16x16.png" type="image/x-icon">
  <script defer src="./js/script.js"></script>
</head>

<body>
  <div class="container">
    <div class="row min-vh-100 justify-content-center align-items-center">
      <div class="col-lg-5">
        <?php
        if (!empty($login_err)) {
          echo "<div class='alert alert-danger'>" . $login_err . "</div>";
        }
        ?>
        <div class="form-wrap border rounded p-4">
          <h1>Log In</h1>
          <p>Please login to continue</p>
          <!-- form starts here -->
          <form action="<?= htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" novalidate>
            <div class="mb-3">
              <label for="user_login" class="form-label">Email or username</label>
              <input type="text" class="form-control" name="user_login" id="user_login" value="<?= $user_login; ?>">
              <small class="text-danger"><?= $user_login_err; ?></small>
            </div>
            <div class="mb-2">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" name="user_password" id="password">
              <small class="text-danger"><?= $user_password_err; ?></small>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="togglePassword">
              <label for="togglePassword" class="form-check-label">Show Password</label>
            </div>
            <div class="mb-3">
              <input type="submit" class="btn btn-primary form-control" name="submit" value="Log In">
            </div>
            <p class="mb-0">Don't have an account ? <a href="./register.php">Sign Up</a></p>
          </form>
          <!-- form ends here -->
        </div>
      </div>
    </div>
  </div>
</body>

</html>