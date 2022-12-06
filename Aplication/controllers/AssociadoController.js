const Associado = require('../models/Associado')

//Chamando a página de cadastro
module.exports = class AssociadoController {
    static novoUsuario(req, res) {
        res.render('cadastrar')
    }

//Salvando os dados do usuário
    static async salvarUsuario(req,res){

        const novoAssociado = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        matriculaEmpresa: req.body.matriculaEmpresa,
        email: req.body.email,
        senha: req.body.senha,
        status: false,
        }

        await Associado.create(novoAssociado)

        res.redirect('/')
    }
}