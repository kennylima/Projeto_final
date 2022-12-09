const express           = require('express')
const router            = express.Router()
const LoginController   = require ('../controllers/LoginController')
const checarLogado      = require('../helpers/auth').checarLogado

//Rota de login
router.get('/', LoginController.novoLogin)

//Rota para verificar os dados de login
router.post('/', LoginController.loginUser)

//Rota de logout
router.get('/logout', LoginController.logout)

module.exports = router