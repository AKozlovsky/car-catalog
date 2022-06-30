<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$localhost = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cars";

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);
$conn = new mysqli($localhost, $username, $password, $dbname);
mysqli_set_charset($conn, 'utf8');

if ($conn->connect_error) {
    die("Error : " . $conn->connect_error);
}
echo $method;
exit;
switch ($method) {
    case 'GET':
        if (strpos($_SERVER['PATH_INFO'], 'logos') !== false) {
            $letter = $_GET['letter'];
            $sql = "SELECT * FROM logos" . ($letter ? " WHERE letter='$letter'" : '');
        }

        // $letter = $_GET['id'];
        //        $sql = "select * from cars" . ($id ? " where id=$id" : '');

        break;
    case 'PUT':
        //        $id = $input["id"];
        //        $number = $input["number"];
        //        $amount = $input["amount"];
        //        $sql = "update policies set number = '$number', amount = $amount where id=$id";
        break;
    case 'POST':
        //        $number = $input["number"];
        //        $amount = $input["amount"];
        //        $sql = "insert into policies (number, amount) ('$number', '$amount')";
        break;
    case 'DELETE':
        //        $id = $_GET['id'];
        //        $sql = "delete from policies where id=$id";
        break;
}

// run SQL statement
$result = mysqli_query($conn, $sql);

// die if SQL statement failed
if (!$result) {
    http_response_code(404);
    die(mysqli_error($conn));
}

if ($method == 'GET') {
    //    if (!$id)
    echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    //    if (!$id)
    echo ']';
} elseif ($method == 'POST') {
    //    echo mysqli_insert_id($conn);
} else {
    //    echo mysqli_affected_rows($conn);
}

$conn->close();
