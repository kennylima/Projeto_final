const express           = require('express')
const router            = express.Router()
const LoginController   = require ('../controllers/LoginController')
const checarLogado      = require('../helpers/auth').checarLogado

//Chamando a rota da tela de login
router.get('/', LoginController.novoLogin)

//Chamando a rota de login
router.post('/', LoginController.loginUser)

//Chamando a rota de logout
router.get('/logout', checarLogado, LoginController.logout)

module.exports = router