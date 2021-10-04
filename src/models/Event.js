const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            date: DataTypes.DATE,
        }, {
            freezeTableName: true,
            tableName: "events",
            sequelize,
        },)
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "userId", as: 'owner' })
        //Relação um para muitos, "fpreignKey" é a chave estrangeira de relacionamento
    }
}

module.exports = Event;
