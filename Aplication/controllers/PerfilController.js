const Dependente = require('../models/Dependente')
const Reserva = require('../models/Reserva')
const PerfilUsuario = require('../models/Usuario')
const PerfilAssociado = require('../models/Associado')

module.exports = class PerfilController {

//Chamando a página do perfil
    static meuPerfil (req, res) {
        res.render('perfil')
    }

//Chamando a página de editar o perfil
    static editarPerfil (req, res) {
        res.render('perfil-edit')
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

//Salvando os dados editados do perfil
    static async salvarEdicao (req,res){

        const editarPerfilUsuario = {
        id: req.body.id,
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha
        }

        const editarPerfilAssociado = {
            telefone: req.body.telefone,
            matriculaEmpresa: req.body.matriculaEmpresa
        }

        await PerfilUsuario.update(editarPerfilUsuario)

        await PerfilAssociado.update(editarPerfilAssociado)

        res.redirect(`/perfil`);   
    }
}