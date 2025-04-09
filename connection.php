<?php
// Load environment variables (use .env file or other secure methods for production)
$servername = getenv('DB_SERVER') ?: 'localhost'; // Default to 'localhost' if not set
$username = getenv('DB_USERNAME') ?: 'root'; // Default to 'root' if not set
$password = getenv('DB_PASSWORD') ?: 'Itz3ree!'; // Default password, but should be in env variables
$dbname = getenv('DB_NAME') ?: 'hangingGardens'; // Default database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Log the error to a file (better than using die())
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed. Please try again later.");
} else {
    // Optionally log success to a debug file (not recommended in production)
    // error_log("Connected successfully to database: $dbname");
}
?>
