const Associado = require('../models/Associado')

const bcrypt = require('bcryptjs')

//Chamando a página de cadastro
module.exports = class AssociadoController {
    static novoUsuario(req, res) {
        res.render('cadastrar')
    }

//Salvando os dados do usuário
    static async salvarUsuario(req,res){

        //Pegar os dados do formulário
        const {nome, cpf, telefone, matriculaEmpresa, email, senha, status} = req.body

        // const novoAssociado = {
        // nome: req.body.nome,
        // cpf: req.body.cpf,
        // telefone: req.body.telefone,
        // matriculaEmpresa: req.body.matriculaEmpresa,
        // email: req.body.email,
        // senha: req.body.senha,
        // status: false,
        // }

        //Confirmar se o email cadastrado já existe no BD
        const userExist = await Associado.findOne({where: {email: email}})
        
        if(userExist){
            console.log("Usuário já cadastrado")
            res.redirect('/cadastrar')
            return
        }

        //Criptografar a senha
        const salt = bcrypt.genSaltSync(10)
        const senhaCriptografada = bcrypt.hashSync(senha, salt)

        //Criar usuário
        try {
            const associadoNovo = {nome, cpf, telefone, matriculaEmpresa, email, senha: senhaCriptografada, status}

            await Associado.create(associadoNovo)
            
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }


    }
}