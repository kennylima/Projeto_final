const Associado = require('../models/Associado')
const Administrador = require('../models/Administrador')
const bcrypt = require('bcryptjs')

//Chamando a página de cadastro
module.exports = class LoginController {
    static async novoLogin(req, res) {
        res.render('login')
    }

    static async loginUser(req, res) {

        //Pegar dados digitados na requisição de login
        const {email, senha} = req.body

        if(await Associado.findOne({raw: true, where: {email: email}})){

        //Validar se o usuário existe
        const userExist = await Associado.findOne({raw: true, where: {email: email}})

        //Validar se a senha cadastrada existe
        const senhaCadastrada = bcrypt.compareSync(senha, userExist.senha)

        if(!senhaCadastrada){
            console.log("Senha incorreta")
            res.redirect('/login')
            return
        }

        // // Guardando o identificador do usuário na sessão
        // console.log(req.session)
        // req.session.userId = userExist.id

        // req.session.save(() => {
        //     console.log('Fez o login de forma correta!');
            if(userExist.status == 0){
                res.redirect('/login')
            }else{
            res.redirect(`/perfil/${userExist.id}`)
            }
        // })

        } else if(await Administrador.findOne({raw:true, where: {email: email}})){
            const administrador =  await Administrador.findOne({raw:true, where: {email: email}})
            if(administrador.senha != senha){
                console.log("senha incorreta")
                res.redirect('/login')
            } else{
                if(administrador.nivelAcesso == 0){
                    // req.session.save(() => {
                    //     console.log('Fez o login de forma correta!');
                        res.redirect(`/perfil/administrador/1`)
                    // })
                } else{
                    // req.session.save(() => {
                        // console.log('Fez o login de forma correta!');
                        res.redirect(`/perfil/administrador/2`)
                    // })
                }
            }
        }
        else{
            console.log("Email ou senha inválido")
            res.redirect('/login')
        }
    }
}
