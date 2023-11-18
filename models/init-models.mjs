import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _mensajes from  "./mensajes.js";
import _multimedia from  "./multimedia.js";
import _publicaciones from  "./publicaciones.js";
import _redesusuario from  "./redesusuario.js";
import _seguidores from  "./seguidores.js";
import _usuarios from  "./usuarios.js";

export function initModels(sequelize) {
  const mensajes = _mensajes.init(sequelize, DataTypes);
  const multimedia = _multimedia.init(sequelize, DataTypes);
  const publicaciones = _publicaciones.init(sequelize, DataTypes);
  const redesusuario = _redesusuario.init(sequelize, DataTypes);
  const seguidores = _seguidores.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  multimedia.belongsTo(publicaciones, { as: "id_publicacion_publicacione", foreignKey: "id_publicacion"});
  publicaciones.hasMany(multimedia, { as: "multimedia", foreignKey: "id_publicacion"});
  mensajes.belongsTo(usuarios, { as: "id_remitente_usuario", foreignKey: "id_remitente"});
  usuarios.hasMany(mensajes, { as: "mensajes", foreignKey: "id_remitente"});
  mensajes.belongsTo(usuarios, { as: "id_destinatario_usuario", foreignKey: "id_destinatario"});
  usuarios.hasMany(mensajes, { as: "id_destinatario_mensajes", foreignKey: "id_destinatario"});
  multimedia.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(multimedia, { as: "multimedia", foreignKey: "id_usuario"});
  publicaciones.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(publicaciones, { as: "publicaciones", foreignKey: "id_usuario"});
  redesusuario.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(redesusuario, { as: "redesusuarios", foreignKey: "id_usuario"});
  seguidores.belongsTo(usuarios, { as: "seguidor_usuario", foreignKey: "seguidor"});
  usuarios.hasMany(seguidores, { as: "seguidores", foreignKey: "seguidor"});
  seguidores.belongsTo(usuarios, { as: "seguido_usuario", foreignKey: "seguido"});
  usuarios.hasMany(seguidores, { as: "seguido_seguidores", foreignKey: "seguido"});

  return {
    mensajes,
    multimedia,
    publicaciones,
    redesusuario,
    seguidores,
    usuarios,
  };
}
