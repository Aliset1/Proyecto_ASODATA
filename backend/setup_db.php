<?php
$host = "localhost";
$usuario = "root";
$contrasena = "";

// Crear conexión sin especificar base de datos
$conn = new mysqli($host, $usuario, $contrasena);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS asodat_db";
if ($conn->query($sql) === TRUE) {
    echo "Base de datos 'asodat_db' creada o ya existe.\n";
} else {
    echo "Error creando la base de datos: " . $conn->error . "\n";
}

// Seleccionar la base de datos
$conn->select_db("asodat_db");

// Leer y ejecutar el archivo SQL
$sql_file = "../BDD-ASODAT/asodat_db.sql";
if (file_exists($sql_file)) {
    $sql_content = file_get_contents($sql_file);
    
    // Dividir el archivo en consultas individuales
    $queries = explode(';', $sql_content);
    
    foreach ($queries as $query) {
        $query = trim($query);
        if (!empty($query) && !preg_match('/^(--|\/\*|SET|START|COMMIT)/', $query)) {
            if ($conn->query($query) === TRUE) {
                echo "Consulta ejecutada exitosamente.\n";
            } else {
                echo "Error ejecutando consulta: " . $conn->error . "\n";
            }
        }
    }
    echo "Base de datos configurada exitosamente.\n";
} else {
    echo "Archivo SQL no encontrado: $sql_file\n";
}

$conn->close();
?> 