//É ele quem lida com as requisições e devolve respostas para o frontend
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
    async index(req, res) {
        const users = await User.findAll() //Podemos usar o findOne para procurar apenas

        return res.json(users)
    },

    async store(req, res) {
        const { name, password, email } = req.body //Corpo de requisição
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name: name, email: email, password: hashedPassword }) //"Espera finalizar para então continuar"
        //"O método "create() cria um novo usuário"
        return res.json(user)
    }, //Método que armazena um usuário

    async login(req, res) {
        const { name, password } = req.body

        const hashedPassword = await User.findAll({
            where: {
                name: {
                    [Op.iLike]: name
                }
            },
            attributes: ['password']
        })

        if (!hashedPassword[0]) {
            return res.status(400).json({ error: 'Usuário não encontrado!' })
        }

        if (await bcrypt.compare(password, hashedPassword[0].password)) {
            const user = await User.findAll({
                where: {
                    name: {
                        [Op.iLike]: name
                    },
                },
                attributes: ['id', 'name', 'email'],
                include: {
                    association: 'events',
                    attributes: ['id', 'name', 'date', 'description', 'createdAt', 'updatedAt']
                }
            })
            const userId = user[0].id;
            const token = jwt.sign({ userId }, secret, { expiresIn: 3600 });

            return res.json({ user, token })
        } else {
            return res.json({ response: 'Tente novamente' })
        }
    },

    async edit(req, res) {
        const { name, email, password } = req.body

        let hashedPassword = null;
        let { newName, newEmail } = []

        const user = await User.findAll({
            where: {
                id: req.userId
            }
        })

        if(!user[0]){
            return res.status(400).json({error: 'Usuário não encontrado!'})
        }

        if(!name){
            newName = user[0].name
        } else {
            newName = name
        }

        if(!email){
            newEmail = user[0].email
        } else {
            newEmail = email
        }

        if(!password){
            hashedPassword = user[0].password
        } else {
            hashedPassword = await bcrypt.hash(password, 10)
        }

        User.update(
            {
                name: newName,
                email: newEmail,
                password: hashedPassword
            },
            {
                where: {
                    id: req.userId
                }
            }
        ).then(() => res.send("Sucesso!"))
    }
}