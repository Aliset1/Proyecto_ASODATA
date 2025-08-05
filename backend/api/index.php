<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obtener ruta y método
$basePath = str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
$requestUri = str_replace($basePath, '', $_SERVER['REQUEST_URI']);
$path = trim(parse_url($requestUri, PHP_URL_PATH), '/');
$method = $_SERVER['REQUEST_METHOD'];

// Routing principal
switch ($path) {
    case 'auth/login':
        handleLogin($method);
        break;
    case 'auth/logout':
        echo json_encode(['message' => 'Sesión cerrada.']);
        break;
    case 'socios':
        handleSocios($method);
        break;
    case 'transacciones':
        handleTransacciones($method);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint no encontrado']);
        break;
}

// ================= FUNCIONES =================

function handleLogin($method) {
    if ($method === 'POST') {
        $conn = require __DIR__ . '/../conexion.php';

        $data = json_decode(file_get_contents('php://input'), true);
        $cedula = $data['cedula'] ?? '';
        $contrasena = $data['contrasena'] ?? '';

        $stmt = $conn->prepare("SELECT u.*, r.nombre AS rol FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id WHERE u.cedula = ?");
        $stmt->bind_param('s', $cedula);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($usuario = $result->fetch_assoc()) {
            if (password_verify($contrasena, $usuario['password'])) {
                echo json_encode(['status' => 'success', 'user' => $usuario]);
                return;
            }
        }

        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas']);
    }
}

function handleSocios($method) {
    $conn = require __DIR__ . '/../conexion.php';

    if ($method === 'GET') {
        $sql = "SELECT s.*, u.cedula AS cedula_usuario, r.nombre AS rol 
                FROM socios s 
                LEFT JOIN usuarios u ON s.id_usuario = u.id 
                LEFT JOIN roles r ON u.id_rol = r.id";

        $result = $conn->query($sql);
        $socios = [];

        while ($row = $result->fetch_assoc()) {
            $socios[] = $row;
        }

        echo json_encode($socios);
    }
}

function handleTransacciones($method) {
    $conn = require __DIR__ . '/../conexion.php';

    if ($method === 'GET') {
        $sql = "SELECT t.*, s.cedula, s.nombres, s.apellidos 
                FROM transacciones t
                LEFT JOIN socios s ON t.id_socio = s.id
                ORDER BY t.fecha DESC";

        $result = $conn->query($sql);
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
    }
}
