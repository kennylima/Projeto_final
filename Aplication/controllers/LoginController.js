const Associado = require('../models/Associado')
const Administrador = require('../models/Administrador')
const bcrypt = require('bcryptjs')

module.exports = class LoginController {
    
    //Renderiza a página de login
    static async novoLogin(req, res) {
        res.render('login')
    }

    //Função de logar (Diferencia usuário de administrador o login)
    static async loginUser(req, res) {
        //Pegar dados digitados na requisição de login
        const {email, senha} = req.body
        const associadoExist = await Associado.findOne({raw: true, where: {email: email}})
        
        if(associadoExist){
            //Validar se a senha cadastrada existe
            const senhaCadastrada = bcrypt.compareSync(senha, associadoExist.senha)

            if(!senhaCadastrada){
                req.flash('atencao', 'Atenção!')
                req.flash('message', 'Email e/ou senha incorreto!')

                req.session.save(() =>{
                    res.redirect('/login')
                })
                console.log("Email e/ou senha incorreto!")
                return
            }
                
                if(associadoExist.status == 0){
                    console.log("Login não autorizado pelo administrador!")

                    req.flash('atencao', 'Atenção!')
                    req.flash('message', 'Associado não liberado!')

                    req.session.save(() =>{
                        res.redirect('/login')
                    })
                        return
                }else{
                    // Guardando o identificador do usuário na sessão
                    req.session.userId = associadoExist.id
                    req.session.userAdm = false 

                    console.log("Login de associado realizado com sucesso!")
                    req.session.save(() =>{
                        
                        res.redirect(`/perfil/${associadoExist.id}`)
                    })
                }

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
            req.session.userAdm = true

            req.session.save(() => {
                console.log("Sessão salva.")

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

    //Função de logout
    static logout(req, res) {
        if(req.session.userId){
            req.session.destroy()
            res.redirect('/')
        }
    }
}