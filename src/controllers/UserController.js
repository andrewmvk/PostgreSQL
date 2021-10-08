//É ele quem lida com as requisições e devolve respostas para o frontend
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
    async index(req, res) {
        const user = await User.findAll({
            where: {
                id: req.userId
            }
        })

        if(user[0].admin == true){
            const users = await User.findAll() //Podemos usar o findOne para procurar apenas

            return res.json(users)
        } else {
            return res.status(401).send()
        }
        
    },

    async store(req, res) {
        const { name, password, email, admin } = req.body //Corpo de requisição
        let newAdmin = false

        if(email.includes(" "||"@"||".com")){
            return res.status(400).json({ error: 'Formato de email incorreto!' })
        }

        if(!name||!password||!email) {
            return res.status(406).send() //Não preencheu todos os campos obrigatórios
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { name: {[Op.iLike]: name}}, 
                    { email: {[Op.iLike]: email}}
                ],    
            }
        }) 
        
        if(existingUser!=undefined){
            return res.status(400).json({ error: 'Usuário já existente' })
        }

        if(admin == "false"||!admin) {
            newAdmin = false
        } else if (admin == "true") {
            newAdmin = true
        } else {
            return res.status(400).send()
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name: name, email: email, password: hashedPassword, admin: newAdmin }) //"Espera finalizar para então continuar"
        //"O método "create() cria um novo usuário"
        return res.json(user)
    }, //Método que armazena um usuário

    async login(req, res) {
        const { email, password } = req.body

        if(!password||!email){
            return res.status(406).json({ error: 'Preencha todos os campos.' })
        }

        const hashedPassword = await User.findAll({
            where: {
                email: {
                    [Op.iLike]: email
                }
            },
            attributes: ['password']
        })

        if (!hashedPassword[0]) {
            return res.status(400).json({ error: 'Email incorreto!' })
        }

        if (await bcrypt.compare(password, hashedPassword[0].password)) {
            const user = await User.findAll({
                where: {
                    email: {
                        [Op.iLike]: email
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
            return res.status(401).json({ error: 'Tente novamente' })
        }
    },

    async edit(req, res) {
        const { name, email, password } = req.body

        if(!name&&!email&&!password) {
            return res.status(304).send()
        }

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
        ).then(() => res.status(200).send())
    }
}