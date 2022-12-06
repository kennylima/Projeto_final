const Dependente = require('../models/Dependente')
const Reserva = require('../models/Reserva')
const Associado = require('../models/Associado')

module.exports = class PerfilController {

//Chamando a página do perfil
    static async meuPerfil (req, res) {
        const dependentes = await Dependente.findAll({raw: true})
        const reservas = await Reserva.findAll({raw: true})
        const associados = await Associado.findAll({raw: true})

        res.render('perfil', {dependentes, reservas, associados})
    }

//Chamando a página de editar o perfil
    static async editarPerfil (req, res) {
        const associados = await Associado.findAll({raw: true})

        res.render('perfil-edit', {associados})
    }

//Salvando os dados editados do perfil
    static async salvarPerfil (req,res){

        // const editarPerfilAssociado = {
        // nome: req.body.nome,
        // cpf: req.body.cpf,
        // telefone: req.body.telefone,
        // matriculaEmpresa: req.body.matriculaEmpresa,
        // email: req.body.email,
        // senha: req.body.senha
        // }

        // await Associado.update(editarPerfilAssociado)

        res.redirect(`/perfil`);   
    }

//Chamando a página de cadastro de dependente
    static novoDependente (req, res) {
        res.render('dependente')
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

//Editando os dados do dependente
static async editarDependente (req,res){

    // const editarPerfilAssociado = {
    // nome: req.body.nome,
    // cpf: req.body.cpf,
    // telefone: req.body.telefone,
    // matriculaEmpresa: req.body.matriculaEmpresa,
    // email: req.body.email,
    // senha: req.body.senha
    // }

    // await Associado.update(editarPerfilAssociado)

    res.render('dependente-edit')   
}

//Salvando os dados editados do dependente
static async salvarEdicaoDependente (req,res){

    // const editarPerfilAssociado = {
    // nome: req.body.nome,
    // cpf: req.body.cpf,
    // telefone: req.body.telefone,
    // matriculaEmpresa: req.body.matriculaEmpresa,
    // email: req.body.email,
    // senha: req.body.senha
    // }

    // await Associado.update(editarPerfilAssociado)

    res.redirect(`/perfil`);   
}

//Salvando os dados editados do dependente
static async deletarDependente (req,res){
    // const id = req.params.id;

    // await Dependente.destroy({where: {id: id}});

    res.redirect(`/perfil`);   
}

//Chamando a página de cadastro de reservas
    static novaReserva (req, res) {
        res.render('reservas')
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

//Chamando a página do administrador nível 1
    static async loginAdministradorUm (req, res) {
        const reservas = await Reserva.findAll({raw: true})

        res.render('perfilAdmUm', {reservas})
    }

//Chamando a página do administrador nível 2
    static async loginAdministradorDois (req, res) {
        const reservas = await Reserva.findAll({raw: true})
        const associados = await Associado.findAll({raw: true})

        res.render('perfilAdmDois', {reservas, associados})
    }
}