<?php
// Include the connection script
require_once 'connection.php';

// Set content type to JSON
header('Content-Type: application/json');

// Response array
$response = [
    'status' => 'error',
    'message' => 'Invalid request',
    'data' => null
];

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Handle request based on the HTTP method
switch ($method) {
    case 'GET':
        // Fetch transactions by TransactionID or all transactions
        if (isset($_GET['TransactionID'])) {
            $transactionID = intval($_GET['TransactionID']);
            $query = "SELECT * FROM Transaction WHERE TransactionID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('i', $transactionID);
        } else {
            $query = "SELECT * FROM Transaction ORDER BY TransactionID";
            $stmt = $conn->prepare($query);
        }

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $response['status'] = 'success';
            $response['message'] = 'Data fetched successfully';
            $response['data'] = $data;
        } else {
            $response['message'] = 'Error fetching data';
        }
        break;

    case 'POST':
        // Add a new transaction
        $data = json_decode(file_get_contents('php://input'), true);
        $query = "INSERT INTO Transaction (RegID, FinanceID, Name1, Name2, PhoneNo, Amount) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param(
            'iisssi',
            $data['RegID'],
            $data['FinanceID'],
            $data['Name1'],
            $data['Name2'],
            $data['PhoneNo'],
            $data['Amount']
        );

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Transaction added successfully';
            $response['data'] = ['TransactionID' => $stmt->insert_id];
        } else {
            $response['message'] = 'Error adding transaction';
        }
        break;

    case 'PUT':
        // Update an existing transaction
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['TransactionID'])) {
            $response['message'] = 'TransactionID is required for update';
            break;
        }

        $query = "UPDATE Transaction SET RegID = ?, FinanceID = ?, Name1 = ?, Name2 = ?, PhoneNo = ?, Amount = ? WHERE TransactionID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param(
            'iisssii',
            $data['RegID'],
            $data['FinanceID'],
            $data['Name1'],
            $data['Name2'],
            $data['PhoneNo'],
            $data['Amount'],
            $data['TransactionID']
        );

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Transaction updated successfully';
        } else {
            $response['message'] = 'Error updating transaction';
        }
        break;

    case 'DELETE':
        // Delete a transaction by TransactionID
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['TransactionID'])) {
            $response['message'] = 'TransactionID is required for deletion';
            break;
        }

        $query = "DELETE FROM Transaction WHERE TransactionID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $data['TransactionID']);

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Transaction deleted successfully';
        } else {
            $response['message'] = 'Error deleting transaction';
        }
        break;

    default:
        $response['message'] = 'Unsupported request method';
        break;
}

// Close the database connection
$conn->close();

// Send the JSON response
echo json_encode($response);
?>
