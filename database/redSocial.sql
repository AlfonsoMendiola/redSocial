CREATE DATABASE redsocial;
DROP DATABASE redsocial;
USE redsocial;

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
DROP TABLE usuarios;

CREATE TABLE roles(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNSIGNED NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    module_name VARCHAR(50) NOT NULL,
    permisos JSON NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
)ENGINE=InnoDB;

DROP TABLE roles;
CREATE TABLE publicaciones(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    id_usuario INT UNSIGNED,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
)ENGINE=InnoDB;
DROP TABLE publicaciones;

CREATE TABLE multimedia(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    urlArchivo TEXT NOT NULL,
    id_usuario INT UNSIGNED NOT NULL,
    id_publicacion INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY(id_publicacion) REFERENCES publicaciones(id)
)ENGINE=InnoDB;
DROP TABLE multimedia;

CREATE TABLE mensajes(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cuerpo LONGTEXT NOT NULL,
    id_remitente INT UNSIGNED NOT NULL,
    id_destinatario INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_remitente) REFERENCES usuarios(id),
    FOREIGN KEY(id_destinatario)REFERENCES usuarios(id)
)ENGINE=InnoDB;
DROP TABLE mensajes;

CREATE TABLE redesUsuario(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    enlace VARCHAR(60) NOT NULL,
    id_usuario INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
)ENGINE=InnoDB;
DROP TABLE redesUsuario;

CREATE TABLE seguidores(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    seguidor INT UNSIGNED NOT NULL,
    seguido INT UNSIGNED NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(seguidor) REFERENCES usuarios(id),
    FOREIGN KEY(seguido) REFERENCES usuarios(id)
)ENGINE=InnoDB;
DROP TABLE seguidores;

# -------------------------

INSERT INTO roles(id_usuario, nombre, module_name, permisos) VALUES
    (1,"administrador", "all", '{"create": true, "read": true, "update": true, "delete": true}')


# npx sequelize-auto -o "./models" -d redsocial -l esm -T p -h localhost -u administrador -p 3306 -x administrador_pass -e mysql