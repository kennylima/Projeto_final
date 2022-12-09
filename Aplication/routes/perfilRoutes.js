const express           = require('express')
const router            = express.Router()
const perfilController = require ('../controllers/PerfilController')
const checarLogado      = require('../helpers/auth').checarLogado
const checarAdm      = require('../helpers/auth').checarAdm

//Rota do perfil
router.get('/:id', checarLogado, perfilController.meuPerfil)

//Rota para editar o perfil
router.get('/edit/:id', checarLogado, perfilController.editarPerfil)

//Rota para salvar a edição do perfil
router.post('/edit/save/:id', checarLogado, perfilController.salvarPerfil);

//Rota para cadastrar novos dependentes
router.get('/dependente/:id', checarLogado, perfilController.novoDependente)

//Rota para salvar novos dependentes
router.post('/dependente/save/:id', checarLogado, perfilController.salvarDependente)

//Rota para editar os dependentes cadastrados
router.get('/dependente/edit/:id', checarLogado, perfilController.editarDependente)

//Rota para salvar os dados editados do dependente
router.post('/dependente/edit/save/:id', checarLogado, perfilController.salvarEdicaoDependente);

//Rota para excluir um dependente
router.get('/dependente/delete/:id', checarLogado, perfilController.deletarDependente)

//Rota para cadastrar nova reserva
router.get('/reservas/:id', checarLogado, perfilController.novaReserva)

//Rota para salvar nova reserva
router.post('/reservas/save/:id', checarLogado, perfilController.salvarReserva)

//Rota para deletar reserva
router.get('/reservas/delete/:id', checarLogado, perfilController.deleteReserva)

//Rota do perfil administrador nível 1
router.get('/administrador/1', checarAdm, perfilController.loginAdministradorUm)

//Rota para pesquisa de associado pelo administrador nível 1
router.get('/administrador/1/pesquisar', checarAdm, perfilController.pesquisaAdministradorUm)

//Rota do perfil administrador nível 2
router.get('/administrador/2', checarAdm, perfilController.loginAdministradorDois)

//Rota do perfil administrador nível 2 para aprovar novos associados
router.post('/administrador/aprovar/:id', checarAdm, perfilController.aprovarNovoUsuario)

//Rota do perfil administrador nível 2 para recusar novos associados
router.get('/administrador/2/delete/:id', checarAdm, perfilController.deleteAssociado)

//Rota para pesquisa de associado pelo administrador nível 2
router.get('/administrador/2/pesquisar', checarAdm, perfilController.pesquisaAdministradorDois)

module.exports = router