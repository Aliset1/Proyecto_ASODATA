-- --------------------------------------------------------------------------
-- SCRIPT DE CREACIÓN Y MIGRACIÓN DE DATOS
-- --------------------------------------------------------------------------
-- Este script crea la nueva estructura de la base de datos y la puebla
-- con los datos migrados de la antigua base de datos.
-- --------------------------------------------------------------------------

-- --------------------------------------------------------------------------
-- 1. CREACIÓN DE LA NUEVA ESTRUCTURA DE LA BASE DE DATOS
-- --------------------------------------------------------------------------

DROP TABLE IF EXISTS transacciones;
DROP TABLE IF EXISTS socios;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;

-- Tabla: roles
CREATE TABLE `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla: usuarios
CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cedula` VARCHAR(20) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `id_rol` INT,
  FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id`)
);

-- Tabla: socios
CREATE TABLE `socios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombres` VARCHAR(100),
  `apellidos` VARCHAR(100),
  `cedula` VARCHAR(20) NOT NULL UNIQUE,
  `fecha_nacimiento` DATE,
  `direccion` VARCHAR(255),
  `correo_electronico` VARCHAR(255),
  `telefono` VARCHAR(20),
  `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
  `id_usuario` INT,
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`)
);

-- Tabla: transacciones
CREATE TABLE `transacciones` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_socio` INT,
  `valor` DECIMAL(10, 2) NOT NULL,
  `fecha` DATE NOT NULL,
  `descripcion` VARCHAR(255),
  `tipo` ENUM('Ingreso', 'Egreso') NOT NULL,
  FOREIGN KEY (`id_socio`) REFERENCES `socios`(`id`)
);


-- --------------------------------------------------------------------------
-- 2. INSERCIÓN DE DATOS INICIALES
-- --------------------------------------------------------------------------

INSERT INTO `roles` (`nombre`) VALUES ('Administrador'), ('Socio');


-- --------------------------------------------------------------------------
-- 3. MIGRACIÓN DE DATOS DESDE LAS TABLAS ANTIGUAS
-- --------------------------------------------------------------------------

-- MIGRACIÓN DE USUARIOS
INSERT INTO `usuarios` (`cedula`, `password`, `id_rol`) VALUES
('1715421516', '$2y$10$JtJvFY0IvXjK8MyfUo6O0u3DqvwXYdbwVZJSFJQdA7cE3yy.M1xPm', 2),
('0503023067', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('0502740702', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1714493399', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1716301389', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1713437535', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1712218084', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1713580556', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1714032128', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1713113946', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('0502396116', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1713426744', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2),
('1712173362', '$2y$10$tJ08dY.R8mOQ/E22d645eO.bB.J9L1XgJ/5xT0f5zY.xK0lE6XqP7', 2);

-- MIGRACIÓN DE SOCIOS
INSERT INTO `socios` (`nombres`, `apellidos`, `cedula`, `estado`, `id_usuario`) VALUES
('EDGAR PAUL', 'SANDOVAL MORALES', '1715421516', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1715421516')),
('MERCEDES MARINA', 'PAEZ VIZCAINO', '0503023067', 'Activo', (SELECT id FROM usuarios WHERE cedula = '0503023067')),
('RAFAEL EMILIO', 'CARRANZA PABON', '0502740702', 'Activo', (SELECT id FROM usuarios WHERE cedula = '0502740702')),
('PATRICIO XAVIER', 'LEMA RUALES', '1714493399', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1714493399')),
('JOSE RAMIRO', 'VILLARREAL CUESTA', '1716301389', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1716301389')),
('JOSE IGNACIO', 'TULCANAZA SANDOVAL', '1713437535', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1713437535')),
('GERMAN ANIBAL', 'SANDOVAL MORALES', '1712218084', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1712218084')),
('MARIA SOLEDAD', 'QUIROZ JARRIN', '1713580556', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1713580556')),
('JOSE VICENTE', 'CARRASCO TOAPANTA', '1714032128', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1714032128')),
('ANTONIO ARMANDO', 'PROAÑO CHACON', '1713113946', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1713113946')),
('JUAN CARLOS', 'VASQUEZ GUACHAMIN', '0502396116', 'Activo', (SELECT id FROM usuarios WHERE cedula = '0502396116')),
('MARIA VICTORIA', 'PEREZ PACHECO', '1713426744', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1713426744')),
('MARIA ELENA', 'RODAS GUERRERO', '1712173362', 'Activo', (SELECT id FROM usuarios WHERE cedula = '1712173362'));

-- MIGRACIÓN DE APORTES A TRANSACCIONES
-- Se asume un año 2025 para las fechas de los aportes.
INSERT INTO `transacciones` (`id_socio`, `valor`, `fecha`, `descripcion`, `tipo`) VALUES
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2024-12-01', 'Aporte de Diciembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-01-01', 'Aporte de Enero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-02-01', 'Aporte de Febrero', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-03-01', 'Aporte de Marzo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-04-01', 'Aporte de Abril', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-05-01', 'Aporte de Mayo', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-06-01', 'Aporte de Junio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-07-01', 'Aporte de Julio', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-08-01', 'Aporte de Agosto', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-09-01', 'Aporte de Septiembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-10-01', 'Aporte de Octubre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2025-11-01', 'Aporte de Noviembre', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2025-01-01', 'Nuevo Ingreso', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2025-01-01', 'Nuevo Ingreso', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2025-01-01', 'Nuevo Ingreso', 'Ingreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2025-01-01', 'Nuevo Ingreso', 'Ingreso');


-- MIGRACIÓN DE ELIMINACIONES A TRANSACCIONES
INSERT INTO `transacciones` (`id_socio`, `valor`, `fecha`, `descripcion`, `tipo`) VALUES
((SELECT id FROM socios WHERE cedula = '1715421516'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '0503023067'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '0502740702'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1714493399'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1716301389'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1713437535'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1712218084'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1713580556'), 5, '2024-12-01', 'Eliminación', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1714032128'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1713113946'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '0502396116'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1713426744'), 5, '2024-12-01', 'Eliminacion', 'Egreso'),
((SELECT id FROM socios WHERE cedula = '1712173362'), 5, '2024-12-01', 'Eliminacion', 'Egreso');