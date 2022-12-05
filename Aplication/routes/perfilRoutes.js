const express           = require('express')
const router            = express.Router()
const perfilController = require ('../controllers/PerfilController')

//Chamando a rota do perfil
router.get('/', perfilController.meuPerfil)

//Chamando a rota de cadastro de novos dependentes
router.get('/dependente', perfilController.novoDependente)

//Rota responsável por salvar os dados da tarefa no banco de dados
router.post('/dependente/save', perfilController.salvarDependente)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas', perfilController.novaReserva)

//Rota responsável por salvar os dados da reserva no banco de dados
router.post('/reservas/save', perfilController.salvarReserva)

module.exports = router