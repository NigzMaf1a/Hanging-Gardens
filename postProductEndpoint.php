<?php
// productEndpoint.php
include 'connection.php'; // Assuming the database connection file is named connection.php

// Get the request method (POST for adding data, GET for fetching data)
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Function to add a new product
function addProduct($conn, $farmerID, $type, $quality, $price) {
    $saleStatus = 'Unsold';  // Default sale status

    // Prepare the SQL query to insert the product
    $sql = "INSERT INTO Produce (FarmerID, Type, Quality, Price, SaleStatus) 
            VALUES (?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters to the prepared statement
        $stmt->bind_param("issis", $farmerID, $type, $quality, $price, $saleStatus);

        // Execute the statement
        if ($stmt->execute()) {
            // Get the last inserted ID (ProductID)
            $productID = $stmt->insert_id;
            echo json_encode(["success" => true, "message" => "Product added successfully", "productID" => $productID]);
        } else {
            echo json_encode(["success" => false, "message" => "Error adding product"]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Failed to prepare the SQL statement"]);
    }
}

// Handle POST request to add product
if ($requestMethod === 'POST') {
    // Get the posted data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Validate and assign input data
    $farmerID = $data->farmerID ?? null;
    $type = $data->type ?? null;
    $quality = $data->quality ?? null;
    $price = $data->price ?? null;

    if ($farmerID && $type && $quality && $price) {
        addProduct($conn, $farmerID, $type, $quality, $price);
    } else {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close(); // Close the connection
?>
