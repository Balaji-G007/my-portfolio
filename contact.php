<?php
$host     = "localhost";
$username = "root";
$password = "";
$database = "portfolio_db";
$conn = mysqli_connect($host, $username, $password, $database);

$name = $email = $message = "";
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name    = htmlspecialchars($_POST["name"]);
  $email   = htmlspecialchars($_POST["email"]);
  $message = htmlspecialchars($_POST["message"]);

  if (empty($name))    $errors[] = "Name is required.";
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email.";
  if (empty($message)) $errors[] = "Message is required.";

  if (empty($errors)) {
    $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";
    if (mysqli_query($conn, $sql)) {
      echo "<p style='color:green; font-family:Arial;'>✅ Thank you, $name! Message saved.</p>";
    } else {
      echo "<p style='color:red; font-family:Arial;'>❌ Error saving message.</p>";
    }
  } else {
    foreach ($errors as $error) {
      echo "<p style='color:red; font-family:Arial;'>❌ $error</p>";
    }
  }
}

function greet($name) {
  if (!empty($name)) {
    return "Hello, $name!";
  } else {
    return "Hello, Guest!";
  }
}

$skills = ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Java", "Python"];
echo "<h3 style='font-family:Arial;'>Skills:</h3><ul style='font-family:Arial;'>";
foreach ($skills as $skill) {
  echo "<li>$skill</li>";
}
echo "</ul>";

mysqli_close($conn);
?>
