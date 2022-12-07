const Dependente = require('../models/Dependente')
const Reserva = require('../models/Reserva')
const Associado = require('../models/Associado')
const Administrador = require('../models/Administrador')

module.exports = class PerfilController {
//Chamando a página do perfil
    static async meuPerfil (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})
        const dependentes = await Dependente.findAll({raw: true, where: {AssociadoId: id}})
        const reservas = await Reserva.findAll({raw: true, where: {AssociadoId: id}})

        res.render('perfil', {dependentes, reservas, associado})
    }

//Chamando a página de editar o perfil
    static async editarPerfil (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        res.render('perfil-edit', {associado})
    }

//Salvando os dados editados do perfil
    static async salvarPerfil (req,res){
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        const editarPerfilAssociado = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        telefone: req.body.telefone,
        matriculaEmpresa: req.body.matriculaEmpresa,
        }

        const salvarPerfilEditado = await Associado.update(editarPerfilAssociado, {where: {id: req.body.id}})

        res.redirect(`/perfil/${associado.id}`)
    }

//Chamando a página de cadastro de dependente
    static async novoDependente (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        res.render('dependente', {associado})
    }

//Salvando os dados do cadastro do dependente
    static async salvarDependente(req,res){
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        const novoDependente = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        parentesco: req.body.parentesco,
        AssociadoId: id
        }

    const salvarDependente = await Dependente.create(novoDependente, {where: {id: req.body.id}})

    res.redirect(`/perfil/${associado.id}`)
    }

//Editando os dados do dependente
    static async editarDependente (req,res){

        const id = req.params.id

        const dependente = await Dependente.findOne({where: {id: id}, raw:true})
        console.log(dependente)

        res.render('dependente-edit', {dependente})   
    }

//Salvando os dados editados do dependente
    static async salvarEdicaoDependente (req,res){
        const dependente = await Dependente.findOne({where: {id: req.body.id}, raw:true})

        const editarPerfilDependente = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        parentesco: req.body.parentesco
        }

        const editarDependente = await Dependente.update(editarPerfilDependente, {where: {id: req.body.id}})

        res.redirect(`/perfil/${dependente.AssociadoId}`)
    }

//Deletando os dados editados do dependente
    static async deletarDependente (req,res){
        const id = req.params.id;
        const dependente = await Dependente.findOne({where: {id: id}, raw:true})

        await Dependente.destroy({where: {id: id}});

        res.redirect(`/perfil/${dependente.AssociadoId}`)   
    }

//Chamando a página de cadastro de reservas
    static async novaReserva (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        res.render('reservas', {associado})
    }

//Salvando os dados do formulário de reserva
    static async salvarReserva(req,res){
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        const novaReserva = {
        local: req.body.local,
        data: req.body.data,
        AssociadoId: id
        }

        if(await Reserva.findOne({raw: true, where:{local: req.body.local, data: req.body.data}})){
            console.log("Data indisponivel")
            res.redirect(`/perfil/reservas/${id}`)
        }else{
        const salvarReserva = await Reserva.create(novaReserva, {where: {id: req.body.id}})
            res.redirect(`/perfil/${associado.id}`)
        }
    }

//Deletando o cadastro de reserva de churrasqueira
    static async deleteReserva (req, res) {
        const id = req.params.id;
        const reserva = await Reserva.findOne({where: {id: id}, raw:true})

        await Reserva.destroy({where: {id: id}});

        res.redirect(`/perfil/${reserva.AssociadoId}`)  
    }

//Chamando a página do administrador nível 1
    static async loginAdministradorUm (req, res) {
        const reservas = await Reserva.findAll({raw: true})
        const administrador = await Administrador.findOne({raw:true, where: {id: 1}})
        res.render('perfilAdmUm', {reservas, administrador})
    }

//Chamando a página do administrador nível 2
    static async loginAdministradorDois (req, res) {
        const reservas = await Reserva.findAll({raw: true, include: Associado})
        const associados = await Associado.findAll({raw: true, where: {status: 0}})
        const administrador = await Administrador.findOne({raw:true, where: {id: 2}})

        res.render('perfilAdmDois', {reservas, associados, administrador})
    }

    //Autorizando novos acessos
    static async aprovarNovoUsuario (req, res) {
        const id = req.params.id
        const novoStatus = Associado.update({status: 1}, {where: {id:id}})
        
        res.redirect('/perfil/administrador/2')
    }
}