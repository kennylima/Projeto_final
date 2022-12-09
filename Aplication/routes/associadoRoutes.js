const express           = require('express')
const router            = express.Router()
const AssociadoController = require ('../controllers/AssociadoController')

//Rrota de cadastro de novos usuários
router.get('/', AssociadoController.novoUsuario)

//Rota para salvar os dados cadastrados pelo associado no banco de dados
router.post('/save', AssociadoController.salvarUsuario);

module.exports = router