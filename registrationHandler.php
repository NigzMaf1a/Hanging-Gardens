<?php
// Include the database connection
include('connection.php');

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Parse input data
$data = json_decode(file_get_contents("php://input"), true);

// Response helper function
function sendResponse($success, $message, $data = null) {
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data" => $data
    ]);
    exit;
}

// Handle CRUD operations
switch ($requestMethod) {
    case 'POST': // Create a new record
        if (!empty($data)) {
            $name1 = $data['Name1'] ?? '';
            $name2 = $data['Name2'] ?? '';
            $phoneNo = $data['PhoneNo'] ?? '';
            $email = $data['Email'] ?? '';
            $password = password_hash($data['Password'] ?? '', PASSWORD_DEFAULT);
            $gender = $data['Gender'] ?? '';
            $regType = $data['RegType'] ?? '';
            $dLocation = $data['dLocation'] ?? '';
            $accStatus = $data['accStatus'] ?? 'Pending';

            $sql = "INSERT INTO Registration (Name1, Name2, PhoneNo, Email, Password, Gender, RegType, dLocation, accStatus)
                    VALUES ('$name1', '$name2', '$phoneNo', '$email', '$password', '$gender', '$regType', '$dLocation', '$accStatus')";

            if ($conn->query($sql) === TRUE) {
                sendResponse(true, "Record created successfully.", ["RegID" => $conn->insert_id]);
            } else {
                sendResponse(false, "Error: " . $conn->error);
            }
        } else {
            sendResponse(false, "Invalid input data.");
        }
        break;

    case 'GET': // Read records
            $regType = $_GET['RegType'] ?? null;
            $regID = $_GET['RegID'] ?? null;
        
            if ($regType) {
                $sql = "SELECT * FROM Registration WHERE RegType = '$regType'";
            } elseif ($regID) {
                $sql = "SELECT * FROM Registration WHERE RegID = $regID";
            } else {
                $sql = "SELECT * FROM Registration";
            }
        
            $result = $conn->query($sql);
        
            if ($result->num_rows > 0) {
                $rows = [];
                while ($row = $result->fetch_assoc()) {
                    $rows[] = $row;
                }
                sendResponse(true, "Records retrieved successfully.", $rows);
            } else {
                sendResponse(false, "No records found.");
            }
            break;
        

    case 'PUT': // Update a record
        if (!empty($data) && isset($data['RegID'])) {
            $regID = $data['RegID'];
            $updates = [];

            if (isset($data['Name1'])) $updates[] = "Name1 = '{$data['Name1']}'";
            if (isset($data['Name2'])) $updates[] = "Name2 = '{$data['Name2']}'";
            if (isset($data['PhoneNo'])) $updates[] = "PhoneNo = '{$data['PhoneNo']}'";
            if (isset($data['Email'])) $updates[] = "Email = '{$data['Email']}'";
            if (isset($data['Password'])) $updates[] = "Password = '" . password_hash($data['Password'], PASSWORD_DEFAULT) . "'";
            if (isset($data['Gender'])) $updates[] = "Gender = '{$data['Gender']}'";
            if (isset($data['RegType'])) $updates[] = "RegType = '{$data['RegType']}'";
            if (isset($data['dLocation'])) $updates[] = "dLocation = '{$data['dLocation']}'";
            if (isset($data['accStatus'])) $updates[] = "accStatus = '{$data['accStatus']}'";

            if (!empty($updates)) {
                $sql = "UPDATE Registration SET " . implode(", ", $updates) . " WHERE RegID = $regID";

                if ($conn->query($sql) === TRUE) {
                    sendResponse(true, "Record updated successfully.");
                } else {
                    sendResponse(false, "Error: " . $conn->error);
                }
            } else {
                sendResponse(false, "No fields to update.");
            }
        } else {
            sendResponse(false, "Invalid input data or missing RegID.");
        }
        break;

    case 'DELETE': // Delete a record
        if (isset($data['RegID'])) {
            $regID = $data['RegID'];
            $sql = "DELETE FROM Registration WHERE RegID = $regID";

            if ($conn->query($sql) === TRUE) {
                sendResponse(true, "Record deleted successfully.");
            } else {
                sendResponse(false, "Error: " . $conn->error);
            }
        } else {
            sendResponse(false, "Missing RegID for deletion.");
        }
        break;

    default:
        sendResponse(false, "Invalid request method.");
}

// Close the database connection
$conn->close();
?>
