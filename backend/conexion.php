<?php
$host = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "bdd refactorizada";

// Crear la conexión
$conn = new mysqli($host, $usuario, $contrasena, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Retornar la conexión activa
return $conn;
