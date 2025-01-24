<?php
// productEndpoint.php
include 'connection.php'; // Assuming the database connection file is named connection.php

// Get the request method (POST for adding data, GET for fetching data)
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Function to fetch all unsold products
function getUnsoldProducts($conn) {
    $sql = "SELECT * FROM Produce WHERE SaleStatus = 'Unsold'";

    if ($result = $conn->query($sql)) {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        return $products;
    } else {
        return [];
    }
}

// Handle GET request to fetch unsold products
if ($requestMethod === 'GET') {
    $products = getUnsoldProducts($conn);
    echo json_encode($products);
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close(); // Close the connection
?>
