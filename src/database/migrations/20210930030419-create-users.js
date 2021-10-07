'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Abaixo temos um exemplo de adição
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    //Abaixo temos um exemplo de exclusão
    return queryInterface.dropTable('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

//O arquivo vem com o nome com a data atual
//Arquivo criado a partir do comando: yarn sequelize migration:create --name=create-events
//Para rodar: yarn sequelize db:migrate
/*
Com o comando (db:migrate) será criado também uma tabela extra
 que armazena as migrations que já rodaram pela base de dados
O nome da tabela é "SequelizeMeta"
 */