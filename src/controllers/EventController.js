const Event = require('../models/Event')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: { association: 'events' }
            //Associação para buscar tanto o usuário quanto seus eventos
            //Para essa associação precisamos do relacionamento no model do user (associate)
        });
        
        //const event = await Event.findAll({ where: { userId } });
        //Forma de buscar apenas os eventos de um certo usuário com o id dele como parâmetro
        return res.json(user);
        //Poderíamos apenas modificar o return para retornar o "user.events" que retornaria apenas os eventos do usuário
    },

    async store(req, res) {
        const { userId } = req.params; //Parâmetro que vem da rota
        const { name, description, date } = req.body;
    
        const user = await User.findByPk(userId);//Primary Key
    
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        } //Se o "user" retornar "null" será mostrado uma mensagem de erro

        const event = await Event.create({
            name,
            description,
            date,
            userId,
        })

        return res.json(event);
    },

    async delete(req, res) {
        const { userId } = req.params;
        const { id } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const event = await Event.findOne({
            where: { id }
        });

        await event.destroy(user);

        return res.json();
    }
}