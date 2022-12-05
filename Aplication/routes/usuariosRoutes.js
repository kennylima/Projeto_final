const express           = require('express')
const router            = express.Router()
const UsuarioController = require ('../controllers/UsuarioController')


//Chamando a rota de cadastro de novos usuários
router.get('/', UsuarioController.novoUsuario)

//Rota responsável por salvar os dados do cadastro no banco de dados
router.post('/save', UsuarioController.salvarUsuario);

module.exports = router


























// //Chamando a página de cadastro
// app.get('/cadastrar', (req, res) =>{
//     res.render('../views/cadastrar')
// });

// //Salvando os dados do formulário no BD
// app.post('/cadastrar/save', async(req,res)=>{
//     const nome = req.body.nome
//     const cpf = req.body.cpf
//     const email = req.body.email
//     const senha = req.body.senha

//     await Usuario.create({nome, cpf, email, senha})

//     const telefone = req.body.telefone
//     const matriculaEmpresa = req.body.matriculaEmpresa
//     let status = req.body.status

//     if(status ==='on'){
//         status = true
//     }else{
//         status = false
//     }

//     await Associado.create({telefone,matriculaEmpresa, status})

//     res.redirect('/')
// })

// module.exports = router