<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

// Remover 'api' del path si está presente
if (strpos($path, 'api/') === 0) {
    $path = substr($path, 4);
}

$method = $_SERVER['REQUEST_METHOD'];

// Router básico
switch($path) {
    case 'auth/login':
        handleAuth($method);
        break;
    case 'auth/logout':
        handleLogout($method);
        break;
    case 'auth/me':
        handleGetCurrentUser($method);
        break;
    case 'socios':
        handleSocios($method);
        break;
    case 'aportes':
        handleAportes($method);
        break;
    case 'dashboard/stats':
        handleDashboardStats();
        break;
    case 'dashboard/aportes-chart':
        handleAportesChart();
        break;
    case 'reportes':
        handleReportes($method);
        break;
    case 'historial-aportes/0500916516':
        handleHistorialAportes();
        break;
    case 'aportes-socios':
        handleAportesSocios($method);
        break;
    case 'estadisticas-aportes':
        handleEstadisticasAportes();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint no encontrado']);
        break;
}

function handleAuth($method) {
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $cedula = $data['cedula'] ?? '';
        $contrasena = $data['contrasena'] ?? '';
        
        // Datos mock para login - Usuarios hardcoded
        $usuarios_mock = [
            '0500916516' => [
                'cedula' => 'x',
                'contrasena' => '123456',
                'apellidos_nombres' => 'Juan Pérez',
                'correo' => 'juan.perez@espe.edu.ec',
                'celular' => '0987654321',
                'campus' => 'BELISARIO',
                'regimen' => 'DOCENTE',
                'rol' => 'socio',
                'cargo' => 'Docente',
                'fecha_afiliacion' => '2020-03-15',
                'estado' => 'activo'
            ],
            '0501515192' => [
                'cedula' => '0501515192',
                'contrasena' => '123456',
                'apellidos_nombres' => 'María García',
                'correo' => 'maria.garcia@espe.edu.ec',
                'celular' => '0987654322',
                'campus' => 'CENTRO',
                'regimen' => 'SERVIDOR PUBLICO',
                'rol' => 'tesorero',
                'cargo' => 'Tesorero',
                'fecha_afiliacion' => '2019-08-20',
                'estado' => 'activo'
            ],
            '0501161251' => [
                'cedula' => '0501161251',
                'contrasena' => '123456',
                'apellidos_nombres' => 'Carlos López',
                'correo' => 'carlos.lopez@espe.edu.ec',
                'celular' => '0987654323',
                'campus' => 'BELISARIO',
                'regimen' => 'TRABAJADOR PUBLICO',
                'rol' => 'socio',
                'cargo' => 'Administrativo',
                'fecha_afiliacion' => '2021-01-10',
                'estado' => 'activo'
            ],
            '0501234567' => [
                'cedula' => '0501234567',
                'contrasena' => '123456',
                'apellidos_nombres' => 'Ana Rodríguez',
                'correo' => 'ana.rodriguez@espe.edu.ec',
                'celular' => '0987654324',
                'campus' => 'CENTRO',
                'regimen' => 'DOCENTE',
                'rol' => 'secretaria',
                'cargo' => 'Secretaria',
                'fecha_afiliacion' => '2018-11-05',
                'estado' => 'activo'
            ],
            '0509876543' => [
                'cedula' => '0509876543',
                'contrasena' => '123456',
                'apellidos_nombres' => 'Luis Martínez',
                'correo' => 'luis.martinez@espe.edu.ec',
                'celular' => '0987654325',
                'campus' => 'BELISARIO',
                'regimen' => 'DOCENTE',
                'rol' => 'socio',
                'cargo' => 'Docente',
                'fecha_afiliacion' => '2022-06-12',
                'estado' => 'activo'
            ],
            '0505555555' => [
                'cedula' => '0505555555',
                'contrasena' => '123456',
                'apellidos_nombres' => 'Patricia Silva',
                'correo' => 'patricia.silva@espe.edu.ec',
                'celular' => '0987654326',
                'campus' => 'CENTRO',
                'regimen' => 'SERVIDOR PUBLICO',
                'rol' => 'socio',
                'cargo' => 'Administrativo',
                'fecha_afiliacion' => '2023-02-28',
                'estado' => 'activo'
            ]
        ];
        
        if (isset($usuarios_mock[$cedula]) && $usuarios_mock[$cedula]['contrasena'] === $contrasena) {
            $user = $usuarios_mock[$cedula];
            $response = [
                'status' => 'success',
                'user' => $user,
                'message' => 'Inicio de sesión exitoso'
            ];
        } else {
            $response = [
                'status' => 'error',
                'mensaje' => 'Cédula o contraseña incorrectas'
            ];
        }
        
        echo json_encode($response);
    }
}

function handleLogout($method) {
    if ($method === 'POST') {
        echo json_encode([
            'status' => 'success',
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }
}

function handleGetCurrentUser($method) {
    if ($method === 'GET') {
        // En un sistema real, aquí verificarías el token de sesión
        // Por ahora, simulamos que el usuario está autenticado
        echo json_encode([
            'status' => 'success',
            'message' => 'Usuario autenticado'
        ]);
    }
}

function handleSocios($method) {
    if ($method === 'GET') {
        // Datos mock de socios - Todos los usuarios hardcoded
        $socios_mock = [
            [
                'id' => 1,
                'cedula' => '0500916516',
                'apellidos_nombres' => 'Juan Pérez',
                'correo' => 'juan.perez@espe.edu.ec',
                'celular' => '0987654321',
                'campus' => 'BELISARIO',
                'regimen' => 'DOCENTE',
                'cargo' => 'Docente',
                'rol' => 'socio',
                'fecha_afiliacion' => '2020-03-15',
                'estado' => 'activo'
            ],
            [
                'id' => 2,
                'cedula' => '0501515192',
                'apellidos_nombres' => 'María García',
                'correo' => 'maria.garcia@espe.edu.ec',
                'celular' => '0987654322',
                'campus' => 'CENTRO',
                'regimen' => 'SERVIDOR PUBLICO',
                'cargo' => 'Tesorero',
                'rol' => 'tesorero',
                'fecha_afiliacion' => '2019-08-20',
                'estado' => 'activo'
            ],
            [
                'id' => 3,
                'cedula' => '0501161251',
                'apellidos_nombres' => 'Carlos López',
                'correo' => 'carlos.lopez@espe.edu.ec',
                'celular' => '0987654323',
                'campus' => 'BELISARIO',
                'regimen' => 'TRABAJADOR PUBLICO',
                'cargo' => 'Administrativo',
                'rol' => 'socio',
                'fecha_afiliacion' => '2021-01-10',
                'estado' => 'activo'
            ],
            [
                'id' => 4,
                'cedula' => '0501234567',
                'apellidos_nombres' => 'Ana Rodríguez',
                'correo' => 'ana.rodriguez@espe.edu.ec',
                'celular' => '0987654324',
                'campus' => 'CENTRO',
                'regimen' => 'DOCENTE',
                'cargo' => 'Secretaria',
                'rol' => 'secretaria',
                'fecha_afiliacion' => '2018-11-05',
                'estado' => 'activo'
            ],
            [
                'id' => 5,
                'cedula' => '0509876543',
                'apellidos_nombres' => 'Luis Martínez',
                'correo' => 'luis.martinez@espe.edu.ec',
                'celular' => '0987654325',
                'campus' => 'BELISARIO',
                'regimen' => 'DOCENTE',
                'cargo' => 'Docente',
                'rol' => 'socio',
                'fecha_afiliacion' => '2022-06-12',
                'estado' => 'activo'
            ],
            [
                'id' => 6,
                'cedula' => '0505555555',
                'apellidos_nombres' => 'Patricia Silva',
                'correo' => 'patricia.silva@espe.edu.ec',
                'celular' => '0987654326',
                'campus' => 'CENTRO',
                'regimen' => 'SERVIDOR PUBLICO',
                'cargo' => 'Administrativo',
                'rol' => 'socio',
                'fecha_afiliacion' => '2023-02-28',
                'estado' => 'activo'
            ]
        ];
        
        echo json_encode([
            'data' => $socios_mock,
            'total' => count($socios_mock),
            'totalPages' => 1,
            'currentPage' => 1
        ]);
    }
}

function handleAportes($method) {
    if ($method === 'GET') {
        echo json_encode([
            'totalAportes' => 1500,
            'aportesMes' => 150,
            'totalSocios' => 150,
            'sociosPagados' => 120,
            'sociosMorosos' => 30,
            'recentAportes' => []
        ]);
    }
}

function handleDashboardStats() {
    echo json_encode([
        'totalSocios' => 150,
        'aportesMes' => 1500,
        'nuevosIngresos' => 5,
        'sociosMorosos' => 12,
        'sociosChange' => 2.5,
        'aportesChange' => 8.3,
        'ingresosChange' => -1.2,
        'morososChange' => -5.0,
        'recentActivity' => [
            [
                'title' => 'Nuevo socio registrado',
                'description' => 'Juan Pérez se afilió a ASODAT',
                'time' => 'Hace 2 horas'
            ],
            [
                'title' => 'Aporte registrado',
                'description' => 'María García pagó su aporte mensual',
                'time' => 'Hace 4 horas'
            ]
        ]
    ]);
}

function handleAportesChart() {
    echo json_encode([
        [
            'mes' => 'Ene',
            'aportes' => 1200
        ],
        [
            'mes' => 'Feb',
            'aportes' => 1350
        ],
        [
            'mes' => 'Mar',
            'aportes' => 1100
        ],
        [
            'mes' => 'Abr',
            'aportes' => 1400
        ],
        [
            'mes' => 'May',
            'aportes' => 1300
        ],
        [
            'mes' => 'Jun',
            'aportes' => 1500
        ]
    ]);
}

function handleReportes($method) {
    if ($method === 'GET') {
        echo json_encode([
            'totalReportes' => 25,
            'reportesGenerados' => 20,
            'pendientes' => 5
        ]);
    }
}

function handleHistorialAportes() {
    echo json_encode([
        [
            'id' => 1,
            'fecha' => '2025-01-15',
            'mes' => 'enero',
            'monto' => 10.00,
            'tipo' => 'mensual',
            'estado' => 'pagado'
        ],
        [
            'id' => 2,
            'fecha' => '2025-02-15',
            'mes' => 'febrero',
            'monto' => 10.00,
            'tipo' => 'mensual',
            'estado' => 'pagado'
        ],
        [
            'id' => 3,
            'fecha' => '2025-03-15',
            'mes' => 'marzo',
            'monto' => 10.00,
            'tipo' => 'mensual',
            'estado' => 'pendiente'
        ]
    ]);
}

function handleAportesSocios($method) {
    if ($method === 'GET') {
        echo json_encode([
            [
                'id' => 1,
                'apellidos_nombres' => 'Juan Pérez',
                'cedula' => '0500916516',
                'campus' => 'BELISARIO',
                'mes' => 'enero',
                'monto' => 10.00,
                'fecha_pago' => '2025-01-15',
                'estado' => 'pagado',
                'cargo' => 'Docente'
            ],
            [
                'id' => 2,
                'apellidos_nombres' => 'María García',
                'cedula' => '0501515192',
                'campus' => 'CENTRO',
                'mes' => 'enero',
                'monto' => 10.00,
                'fecha_pago' => '2025-01-16',
                'estado' => 'pagado',
                'cargo' => 'Tesorero'
            ]
        ]);
    }
}

function handleEstadisticasAportes() {
    echo json_encode([
        'totalRecaudado' => 1500,
        'sociosPagados' => 120,
        'aportesMes' => 150,
        'sociosPendientes' => 30
    ]);
}
?> 