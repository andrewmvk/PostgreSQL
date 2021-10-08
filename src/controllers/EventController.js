const Event = require('../models/Event')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const user = await User.findByPk(req.userId, {
            attributes: ['id','name','email','createdAt'],
            include: { 
                association: 'events', 
                attributes: ['id', 'name', 'date', 'description', 'createdAt', 'updatedAt']
             }
            //Associação para buscar tanto o usuário quanto seus eventos
            //Para essa associação precisamos do relacionamento no model do user (associate)
        });
        
        console.log(req.userId + ' fez essa chamada!')
        //const event = await Event.findAll({ where: { userId } });
        //Forma de buscar apenas os eventos de um certo usuário com o id dele como parâmetro
        return res.json(user);
        //Poderíamos apenas modificar o return para retornar o "user.events" que retornaria apenas os eventos do usuário
    },

    async store(req, res) {
        //const { userId } = req.params; //Parâmetro que vem da rota
        const { name, description, date } = await req.body;
        const userId = req.userId;
        let newDescription = undefined;

        if(!description){
            newDescription = null
        } else {
            newDescription = description
        }
    
        const user = await User.findByPk(req.userId);//Primary Key
    
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        } //Se o "user" retornar "null" será mostrado uma mensagem de erro

        const event = await Event.create({
            name: name,
            description: newDescription,
            date: date,
            userId: userId,
        })

        return res.json(event);
    },

    async delete(req, res) {
        const { id } = req.body;

        if(!id) {
            return res.status(400).json({ error: 'Id do evento não informado!' })
        }

        const user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        const event = await Event.findOne({
            where: { id }
        });

        if(!event) {
            return res.status(400).json({ error: 'Evento não encontrado!' })
        }

        await event.destroy(user);

        return res.json();
    },

    async edit(req, res) {
        const { id, name, description, date } = req.body
        let { newName, newDescription, newDate } = []

        const user = await User.findByPk(req.userId)

        if(!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        const event = await Event.findOne({
            where: { id }
        })

        if(!event) {
            return res.status(404).json({ error: 'Evento não encontrado!' })
        }
        
        if(!name) {
            newName = event.name
        } else {
            newName = name
        }

        if(!description) {
            newDescription = null
        } else {
            newDescription = description
        } 

        if(!date) {
            newDate = event.date
        } else {
            newDate = date
        }

        Event.update(
            {
                name: newName,
                description: newDescription,
                date: newDate
            },
            {
                where: { userId: req.userId }
            }
            ).then(() => res.status(200).send())

        return res.status(200).send();
    }
}