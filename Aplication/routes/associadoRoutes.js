const express           = require('express')
const router            = express.Router()
const AssociadoController = require ('../controllers/AssociadoController')


//Chamando a rota de cadastro de novos usuários
router.get('/', AssociadoController.novoUsuario)

//Rota responsável por salvar os dados do cadastro no banco de dados
router.post('/save', AssociadoController.salvarUsuario);

module.exports = router