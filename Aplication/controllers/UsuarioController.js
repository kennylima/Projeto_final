const Usuario = require('../models/Usuario')
const Associado = require('../models/Associado')

//Chamando a página de cadastro
module.exports = class UsuarioController {
    static novoUsuario(req, res) {
        res.render('cadastrar')
    }

//Salvando os dados do usuário
    static async salvarUsuario(req,res){

        const novoUsuario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha
        }

        const novoAssociado = {
        telefone: req.body.telefone,
        matriculaEmpresa: req.body.matriculaEmpresa,
        status: false
        }

    await Usuario.create(novoUsuario)

    await Associado.create(novoAssociado)

    res.redirect('/')
    }
}