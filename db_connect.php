<?php
$host     = "localhost";
$username = "root";
$password = "";
$database = "portfolio_db";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
  die("<p style='color:red; font-family:Arial;'>❌ Connection failed: " . mysqli_connect_error() . "</p>");
}
echo "<p style='color:green; font-family:Arial;'>✅ Connected to MySQL successfully!</p>";

$result = mysqli_query($conn, "SELECT * FROM contacts");
if (mysqli_num_rows($result) > 0) {
  echo "<table border='1' style='font-family:Arial; border-collapse:collapse;'>";
  echo "<tr><th style='padding:8px;'>ID</th><th style='padding:8px;'>Name</th><th style='padding:8px;'>Email</th><th style='padding:8px;'>Message</th></tr>";
  while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td style='padding:8px;'>" . $row['id'] . "</td>";
    echo "<td style='padding:8px;'>" . $row['name'] . "</td>";
    echo "<td style='padding:8px;'>" . $row['email'] . "</td>";
    echo "<td style='padding:8px;'>" . $row['message'] . "</td>";
    echo "</tr>";
  }
  echo "</table>";
} else {
  echo "<p style='font-family:Arial;'>No records found yet.</p>";
}

mysqli_close($conn);
?>
