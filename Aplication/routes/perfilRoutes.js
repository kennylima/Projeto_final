const express           = require('express')
const router            = express.Router()
const perfilController = require ('../controllers/PerfilController')
const checarLogado      = require('../helpers/auth').checarLogado

//Chamando a rota do perfil
router.get('/:id', checarLogado, perfilController.meuPerfil)

//Chamando a rota de editar o perfil
router.get('/edit/:id', checarLogado, perfilController.editarPerfil)

//Chamando a rota de salvar a edição do perfil
router.post('/edit/save/:id', checarLogado, perfilController.salvarPerfil);

//Chamando a rota de cadastro de novos dependentes
router.get('/dependente/:id', checarLogado, perfilController.novoDependente)

//Chamando a rota para editar os dependentes do usuário
router.get('/dependente/edit/:id', checarLogado, perfilController.editarDependente)

//Chamando a rota de salvar a edição do dependente
router.post('/dependente/edit/save/:id', checarLogado, perfilController.salvarEdicaoDependente);

//Chamando a rota para excluir o dependente selecionado
router.get('/dependente/delete/:id', checarLogado, perfilController.deletarDependente)

//Rota responsável por salvar os dados editados do dependente
router.post('/dependente/save/:id', checarLogado, perfilController.salvarDependente)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas/:id', checarLogado, perfilController.novaReserva)

//Rota responsável por salvar os dados da reserva no banco de dados
router.post('/reservas/save/:id', checarLogado, perfilController.salvarReserva)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas/delete/:id', checarLogado, perfilController.deleteReserva)

//Chamando a rota do perfil administrador 1
router.get('/administrador/1', checarLogado, perfilController.loginAdministradorUm)

//Chamando a rota do perfil administrador 2
router.get('/administrador/2', checarLogado, perfilController.loginAdministradorDois)

//Chamando a rota do perfil administrador 2
router.post('/administrador/aprovar/:id', checarLogado, perfilController.aprovarNovoUsuario)

module.exports = router