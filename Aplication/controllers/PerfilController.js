const { Op, DATE } = require('sequelize')
const Dependente = require('../models/Dependente')
const Reserva = require('../models/Reserva')
const Associado = require('../models/Associado')
const Administrador = require('../models/Administrador')

module.exports = class PerfilController {
//Renderiza a página do perfil
    static async meuPerfil (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})
        const dependentes = await Dependente.findAll({raw: true, where: {AssociadoId: id}})
        const reservas = await Reserva.findAll({raw: true, where: {AssociadoId: id}})

        res.render('perfil', {dependentes, reservas, associado})
    }

//Função para editar os dados do usuário
    static async editarPerfil (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        res.render('perfil-edit', {associado})
    }

//Função para salvar os dados editados do usuário
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

//Renderiza a página de cadastro de dependente
    static async novoDependente (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        res.render('dependente', {associado})
    }

//Função para salvar novo dependente
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

//Função para editar os dados do dependente
    static async editarDependente (req,res){

        const id = req.params.id

        const dependente = await Dependente.findOne({where: {id: id}, raw:true})
        console.log(dependente)

        res.render('dependente-edit', {dependente})   
    }

//Função para salvar os dados editados do dependente
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

//Função para deletar um dependente
    static async deletarDependente (req,res){
        const id = req.params.id;
        const dependente = await Dependente.findOne({where: {id: id}, raw:true})

        await Dependente.destroy({where: {id: id}});

        res.redirect(`/perfil/${dependente.AssociadoId}`)   
    }

//Renderiza a página de cadastro de reservas
    static async novaReserva (req, res) {
        const id = req.params.id
        const associado = await Associado.findOne({raw: true, where: {id: id}})

        res.render('reservas', {associado})
    }

//Função para salvar os dados da reserva
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

            req.flash('atencao', 'Atenção!')
            req.flash('message', 'Data indisponível para esta churrasqueira!')

            req.session.save(() =>{
                res.redirect(`/perfil/reservas/${id}`)
            })

        }else{
            const salvarReserva = await Reserva.create(novaReserva, {where: {id: req.body.id}})

            req.flash('sucesso', 'Sucesso!')
            req.flash('message', 'Churrasqueira reservada com sucesso!')

            req.session.save(() =>{
                res.redirect(`/perfil/${associado.id}`)
            })
        }
    }

//Função para deletando a reserva
    static async deleteReserva (req, res) {
        const id = req.params.id;
        const reserva = await Reserva.findOne({where: {id: id}, raw:true})

        await Reserva.destroy({where: {id: id}});

        res.redirect(`/perfil/${reserva.AssociadoId}`)  
    }

//Renderiza o perfil do administrador nível 1
    static async loginAdministradorUm (req, res) {
        const reservas = await Reserva.findAll({raw: true, include: Associado})
        const administrador = await Administrador.findOne({raw:true, where: {id: 1}})
        res.render('perfilAdmUm', {reservas, administrador})
    }
    
//Função do campo pesquisar do administrador nível 1
    static async pesquisaAdministradorUm(req, res){
        let search = '';
        if(req.query.search){
            search = req.query.search
        }

        const associado = await Associado.findOne({
            where: {
                nome: {[Op.like]: `%${search}%`}
            },
            raw: true,
            order: [['nome']]
        })

        const dependentes = await Dependente.findAll({raw: true, where:{AssociadoId: associado.id}})
        res.render('resultadoPesquisaDois', {search, associado, dependentes}) 
    }

//Renderiza o perfil do administrador nível 2
    static async loginAdministradorDois (req, res) {
        const reservas = await Reserva.findAll({raw: true, include: Associado})
        const associados = await Associado.findAll({raw: true, where: {status: 0}})
        const administrador = await Administrador.findOne({raw:true, where: {id: 2}})

        res.render('perfilAdmDois', {reservas, associados, administrador})
    }

//Função para autorizar novos acessos pelo administrador nível 2
    static async aprovarNovoUsuario (req, res) {
        const id = req.params.id
        const novoStatus = Associado.update({status: 1}, {where: {id:id}})
        
        res.redirect('/perfil/administrador/2')
    }
//Função do campo pesquisar do administrador nível 2
    static async pesquisaAdministradorDois(req, res){
        let search = '';
        if(req.query.search){
            search = req.query.search
        }

        const associado = await Associado.findOne({
            where: {
                nome: {[Op.like]: `%${search}%`}
            },
            raw: true,
            order: [['nome']]
        })

        const dependentes = await Dependente.findAll({raw: true, where:{AssociadoId: associado.id}})
        res.render('resultadoPesquisaDois', {search, associado, dependentes}) 
    }
    
//Função para rejeitar o cadastro de novo associado pelo administrador nível 2
    static async deleteAssociado (req, res) {
        const id = req.params.id;
        
        await Associado.destroy({where: {id: id}});
        
        res.redirect('/perfil/administrador/2')  
    }
}