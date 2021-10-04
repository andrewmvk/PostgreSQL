//É ele quem lida com as requisições e devolve respostas para o frontend
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const users = await User.findAll() //Podemos usar o findOne para procurar apenas

        return res.json(users)
    },

    async store(req, res) {
        const { name, email } = req.body //Corpo de requisição
    
        const user = await User.create({ name, email }) //"Espera finalizar para então continuar"
        //"O método "create() cria um novo usuário"
        return res.json(user)
    } //Método que armazena um usuário
}