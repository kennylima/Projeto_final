const Dependente = require('../models/Dependente')

//Chamando a página de cadastro de dependente
module.exports = class DependenteController {
    static novoDependente(req, res) {
        res.render('dependente')
    }

//Salvando os dados do dependente
    static async salvarDependente(req,res){

        const novoDependente = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        parentesco: req.body.parentesco,
        }

    await Dependente.create(novoDependente)

    res.redirect('/perfil')
    }
}