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

        const associadoExist = await Associado.findOne({raw: true, where: {email: email}})
        
        if(associadoExist){

            //Validar se a senha cadastrada existe
            const senhaCadastrada = bcrypt.compareSync(senha, associadoExist.senha)

            if(!senhaCadastrada){
                console.log("Email e/ou senha incorreto!")
                res.redirect('/login')
                return
            }

            // Guardando o identificador do usuário na sessão
            req.session.userId = associadoExist.id

            req.session.save(() => {
                console.log("Login de associado realizado com sucesso!")

                if(associadoExist.status == 0){
                    res.redirect('/login')
                }else{
                    res.redirect(`/perfil/${associadoExist.id}`)
                }
            })

        }else{
            const administradorExist = await Administrador.findOne({raw:true, where: {email: email}})
            
            if(!administradorExist){
                console.log("Usuário não encontrado")
                res.redirect('/login')
                return
            }

            //Validar se a senha cadastrada existe
            const senhaDigitada = senha

            if(senhaDigitada != administradorExist.senha){

                console.log("Email e/ou senha incorreto!")
                res.redirect('/login')
                return
            }


            // Guardando o identificador do usuário na sessão
            req.session.userId = administradorExist.id

            req.session.save(() => {
                console.log("Sessão salva.");

                if(administradorExist.nivelAcesso == 0){
                    console.log("Login de administrador nível 1 realizado com sucesso!")
                    res.redirect(`/perfil/administrador/1`)
                }else{
                    console.log("Login de administrador nível 2 realizado com sucesso!")
                    res.redirect(`/perfil/administrador/2`)
                }
            })
        }
    }

    static logout(req, res) {
        if(req.session.userId){
            req.session.destroy()
            res.redirect('/')
        }
    }
}