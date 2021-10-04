const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
        }, {
            freezeTableName: true,
            tableName: "users",
            sequelize,
        },)
    }

    static associate(models) {
        this.hasMany(models.Event, { foreignKey: 'userId', as: 'events' })
    }
}

module.exports = User;

/*
O primeiro "sequelize" também pode ser chamado de "connection"
mas a sintaxe do segundo deveria mudar para: "sequelize: connection" 
*/