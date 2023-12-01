CREATE DATABASE redsocial;
DROP DATABASE redsocial;
USE redsocial;

DROP TABLE usuarios;
DROP TABLE rolesUsuarios;
DROP TABLE roles;
DROP TABLE publicaciones;
DROP TABLE multimedia;
DROP TABLE mensajes;
DROP TABLE redesUsuario;
DROP TABLE seguidores;

CREATE TABLE usuarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    displayName VARCHAR(50) NOT null,
    email VARCHAR(50) UNIQUE NOT NULL,
    pass LONGTEXT NOT NULL,
    imgPerfil VARCHAR(255) DEFAULT NULL,
    imgPortada VARCHAR(255) DEFAULT NULL,
    activo BOOLEAN DEFAULT true,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FULLTEXT INDEX fi_search(displayName)
)ENGINE=InnoDB;
CREATE TABLE rolesUsuarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNSIGNED NOT NULL,
    id_rol INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY(id_rol) REFERENCES roles(id)
)ENGINE=InnoDB;
CREATE TABLE roles(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    module_name VARCHAR(50) NOT NULL,
    permisos JSON NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB;
CREATE TABLE multimedia(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    urlArchivo TEXT NOT NULL,
    id_usuario INT UNSIGNED NOT NULL,
    id_publicacion INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY(id_publicacion) REFERENCES publicaciones(id)
)ENGINE=InnoDB;
CREATE TABLE publicaciones(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    id_usuario INT UNSIGNED,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
)ENGINE=InnoDB;
CREATE TABLE mensajes(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cuerpo LONGTEXT NOT NULL,
    id_remitente INT UNSIGNED NOT NULL,
    id_destinatario INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_remitente) REFERENCES usuarios(id),
    FOREIGN KEY(id_destinatario)REFERENCES usuarios(id)
)ENGINE=InnoDB;
CREATE TABLE redesUsuario(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    enlace VARCHAR(60) NOT NULL,
    id_usuario INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
)ENGINE=InnoDB;
CREATE TABLE seguidores(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    seguidor INT UNSIGNED NOT NULL,
    seguido INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(seguidor) REFERENCES usuarios(id),
    FOREIGN KEY(seguido) REFERENCES usuarios(id)
)ENGINE=InnoDB;

# -------------------------

INSERT INTO roles(nombre, module_name, permisos) VALUES
    ("administrador", "all", '{"create": true, "read": true, "update": true, "delete": true}'),
    ("miPerfil", "myAll", '{"create": true, "read": true, "update": true, "delete": true}');

# --------------------------------

CREATE VIEW vista_rolesUsuarios AS
    SELECT rU.id_usuario, rU.id_rol
    FROM rolesUsuarios rU
    INNER JOIN usuarios u ON rU.id_usuario = u.id
    INNER JOIN roles r ON rU.id_rol = r.id;


SELECT * FROM vista_rolesUsuarios;


# npx sequelize-auto -o "./models" -d redsocial -l esm -T p -h localhost -u administrador -p 3306 -x administrador_pass -e mysql