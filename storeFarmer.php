<?php
// Include the database
include('connection.php');

// Get the POST data from the request body
$data = json_decode(file_get_contents("php://input"));

// Extract the farmer data
$name1 = $data->name1;
$name2 = $data->name2;
$email = $data->email;
$phoneNo = $data->phoneNo;
$dLocation = $data->dLocation;
$gender = $data->gender;
$password = password_hash($data->password, PASSWORD_DEFAULT); // Hash the password

// Prepare the SQL query to insert the data into the database
$sql = "INSERT INTO farmers (name1, name2, email, phoneNo, dLocation, gender, password)
        VALUES ('$name1', '$name2', '$email', '$phoneNo', '$dLocation', '$gender', '$password')";

// Execute the query and check if it was successful
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Farmer registered successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

// Close the connection
$conn->close();
?>
