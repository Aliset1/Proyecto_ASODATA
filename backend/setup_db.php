<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Parámetros de conexión
$host = "localhost";
$usuario = "root";
$contrasena = "";

// Crear conexión
$conn = new mysqli($host, $usuario, $contrasena);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Crear la base de datos (sin espacios en el nombre)
$sql = "CREATE DATABASE IF NOT EXISTS bdd_refactorizada";
if ($conn->query($sql) === TRUE) {
    echo "Base de datos 'bdd_refactorizada' creada o ya existe.<br>";
} else {
    die("Error creando la base de datos: " . $conn->error);
}

// Seleccionar la base de datos
$conn->select_db("bdd_refactorizada");

// Establecer charset
$conn->set_charset("utf8");

// Leer y ejecutar el archivo SQL
$sql_file = __DIR__ . "/bdd refactorizada.sql"; // Asegúrate que exista este archivo
if (file_exists($sql_file)) {
    $sql_content = file_get_contents($sql_file);
    $queries = explode(';', $sql_content);

    foreach ($queries as $query) {
        $query = trim($query);
        if (!empty($query)) {
            if ($conn->query($query) === TRUE) {
                echo "Consulta ejecutada exitosamente.<br>";
            } else {
                echo "Error ejecutando consulta: " . $conn->error . "<br>";
            }
        }
    }
    echo "<strong>Base de datos configurada exitosamente.</strong>";
} else {
    echo "Archivo SQL no encontrado: $sql_file";
}

$conn->close();
?>
