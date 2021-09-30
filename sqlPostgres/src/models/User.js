const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = User;

/*
O primeiro "sequelize" também pode ser chamado de "connection"
mas a sintaxe do segundo deveria mudar para: "sequelize: connection" 
*/