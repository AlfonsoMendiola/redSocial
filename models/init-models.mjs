import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _mensajes from  "./mensajes.js";
import _multimedia from  "./multimedia.js";
import _publicaciones from  "./publicaciones.js";
import _redesUsuario from  "./redesUsuario.js";
import _roles from  "./roles.js";
import _rolesUsuarios from  "./rolesUsuarios.js";
import _seguidores from  "./seguidores.js";
import _usuarios from  "./usuarios.js";

export function initModels(sequelize) {
  const mensajes = _mensajes.init(sequelize, DataTypes);
  const multimedia = _multimedia.init(sequelize, DataTypes);
  const publicaciones = _publicaciones.init(sequelize, DataTypes);
  const redesUsuario = _redesUsuario.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const rolesUsuarios = _rolesUsuarios.init(sequelize, DataTypes);
  const seguidores = _seguidores.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  multimedia.belongsTo(publicaciones, { as: "id_publicacion_publicacione", foreignKey: "id_publicacion"});
  publicaciones.hasMany(multimedia, { as: "multimedia", foreignKey: "id_publicacion"});
  rolesUsuarios.belongsTo(roles, { as: "id_rol_role", foreignKey: "id_rol"});
  roles.hasMany(rolesUsuarios, { as: "rolesUsuarios", foreignKey: "id_rol"});
  mensajes.belongsTo(usuarios, { as: "id_remitente_usuario", foreignKey: "id_remitente"});
  usuarios.hasMany(mensajes, { as: "mensajes", foreignKey: "id_remitente"});
  mensajes.belongsTo(usuarios, { as: "id_destinatario_usuario", foreignKey: "id_destinatario"});
  usuarios.hasMany(mensajes, { as: "id_destinatario_mensajes", foreignKey: "id_destinatario"});
  multimedia.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(multimedia, { as: "multimedia", foreignKey: "id_usuario"});
  publicaciones.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(publicaciones, { as: "publicaciones", foreignKey: "id_usuario"});
  redesUsuario.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(redesUsuario, { as: "redesUsuarios", foreignKey: "id_usuario"});
  rolesUsuarios.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(rolesUsuarios, { as: "rolesUsuarios", foreignKey: "id_usuario"});
  seguidores.belongsTo(usuarios, { as: "seguidor_usuario", foreignKey: "seguidor"});
  usuarios.hasMany(seguidores, { as: "seguidores", foreignKey: "seguidor"});
  seguidores.belongsTo(usuarios, { as: "seguido_usuario", foreignKey: "seguido"});
  usuarios.hasMany(seguidores, { as: "seguido_seguidores", foreignKey: "seguido"});

  return {
    mensajes,
    multimedia,
    publicaciones,
    redesUsuario,
    roles,
    rolesUsuarios,
    seguidores,
    usuarios,
  };
}
