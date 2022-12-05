const express           = require('express')
const router            = express.Router()
const ReservaController = require ('../controllers/ReservaController')


//Chamando a rota de cadastro de novos dependentes
router.get('/reservas', ReservaController.novaReserva)

//Rota responsável por salvar os dados da tarefa no banco de dados
router.post('/reservas/save', ReservaController.salvarReserva)

module.exports = router
