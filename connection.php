<?php
$servername = getenv('DB_SERVER') ?: 'localhost';
$username = getenv('DB_USERNAME') ?: 'root';
$password = getenv('DB_PASSWORD') ?: 'Itz3ree!';
$dbname = getenv('DB_NAME') ?: 'hangingGardens';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Log the error to a file (better than using die())
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed. Please try again later.");
}
?>
