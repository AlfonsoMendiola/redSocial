import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mensajes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    cuerpo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_remitente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_destinatario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'usuarios',
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
    tableName: 'mensajes',
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
        name: "id_remitente",
        using: "BTREE",
        fields: [
          { name: "id_remitente" },
        ]
      },
      {
        name: "id_destinatario",
        using: "BTREE",
        fields: [
          { name: "id_destinatario" },
        ]
      },
    ]
  });
  }
}
