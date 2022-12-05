const Dependente = require('../models/Dependente')
const Reserva = require('../models/Reserva')

module.exports = class PerfilController {

//Chamando a página do perfil
    static meuPerfil (req, res) {
        res.render('perfil')
    }
    
//Chamando a página de cadastro de dependente
    static novoDependente (req, res) {
        res.render('dependente')
    }

//Chamando a página de cadastro de reservas
    static novaReserva (req, res) {
        res.render('reservas')
    }

//Salvando os dados do formulário do dependente
    static async salvarDependente(req,res){

        const novoDependente = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        parentesco: req.body.parentesco
        }

    await Dependente.create(novoDependente)

    res.redirect('/perfil')
    }

//Salvando os dados do formulário de reserva
    static async salvarReserva(req,res){

        const novaReserva = {
        local: req.body.local,
        data: req.body.data
        }

    await Reserva.create(novaReserva)

    res.redirect('/perfil')
    }
}