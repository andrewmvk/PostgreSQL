//Irá exportar um objeto de configurações do banco de dados
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '1234567',
    database: 'sqlnode',
    define: {
        timestamps: true,
    },
};
//timestamps: toda a database tem um campo de data criada e atualizada