const Associado = require('../models/Associado')
const bcrypt = require('bcryptjs')

module.exports = class AssociadoController {

//Renderiza a página de cadastro
    static novoUsuario(req, res) {
        res.render('cadastrar')
    }

//Função para dados cadastrados
    static async salvarUsuario(req,res){

        //Pegar os dados do formulário
        const {nome, cpf, telefone, matriculaEmpresa, email, senha, status} = req.body

        //Verificar se o email cadastrado já existe no BD
        const userExist = await Associado.findOne({where: {email: email}})

        if(userExist){
            console.log("Usuário já cadastrado")
            res.redirect('/cadastrar')
            return
        }

        //Criptografar a senha
        const salt = bcrypt.genSaltSync(10)
        const senhaCriptografada = bcrypt.hashSync(senha, salt)

        //Criar novo associado
        try {
            const associadoNovo = {nome, cpf, telefone, matriculaEmpresa, email, senha: senhaCriptografada, status}

            await Associado.create(associadoNovo)

            req.flash('sucesso', 'Sucesso')
            req.flash('message', 'Conta criada com sucesso!')

            req.session.save(() =>{
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }
}