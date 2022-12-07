const express           = require('express')
const router            = express.Router()
const LoginController   = require ('../controllers/LoginController')

//Chamando a rota de cadastro de novos usuários
router.get('/', LoginController.novoLogin)
router.post('/', LoginController.loginUser)




module.exports = router
