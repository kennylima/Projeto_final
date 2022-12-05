const Reserva = require('../models/Reserva')

//Chamando a página de cadastro de Reserva
module.exports = class ReservaController {
    static novaReserva (req, res) {
        res.render('reservas')
    }

//Salvando os dados do Reserva
    static async salvarReserva(req,res){

        const novaReserva = {
        local: req.body.local,
        data: req.body.data
        }

    await Reserva.create(novaReserva)

    res.redirect('/perfil')
    }
}