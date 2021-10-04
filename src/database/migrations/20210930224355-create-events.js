'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: { //Id do usuário que está relacionado com esses eventos
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        //Referencia uma outra tabela, no caso a "users" e o campo "id"
        onUpdate: 'CASCADE', 
        //Sempre que há uma alteração no relacionamento (referência), ele irá modificar aqui também
        onDelete: 'CASCADE',
        /*
        "CASCADE" basicamente realiza a mesma coisa que aconteceu com a referência
        Se ela atualizar ele também atualiza, se remover ele também remove
        */
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};