const express           = require('express')
const router            = express.Router()
const DependenteController = require ('../controllers/DependenteController')


//Chamando a rota de cadastro de novos dependentes
router.get('/dependente', DependenteController.novoDependente)

//Rota responsável por salvar os dados da tarefa no banco de dados
router.post('/dependente/save', DependenteController.salvarDependente)

module.exports = router
