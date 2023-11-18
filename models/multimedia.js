import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class multimedia extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    urlArchivo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_publicacion: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'publicaciones',
        key: 'id'
      }
    },
    creado_en: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'multimedia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "id_publicacion",
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
    ]
  });
  }
}
