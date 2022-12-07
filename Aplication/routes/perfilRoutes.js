const express           = require('express')
const router            = express.Router()
const perfilController = require ('../controllers/PerfilController')

//Chamando a rota do perfil
router.get('/:id', perfilController.meuPerfil)

//Chamando a rota de editar o perfil
router.get('/edit/:id', perfilController.editarPerfil)

//Chamando a rota de salvar a edição do perfil
router.post('/edit/save/:id', perfilController.salvarPerfil);

//Chamando a rota de cadastro de novos dependentes
router.get('/dependente/:id', perfilController.novoDependente)

//Chamando a rota para editar os dependentes do usuário
router.get('/dependente/edit/:id', perfilController.editarDependente)

//Chamando a rota de salvar a edição do dependente
router.post('/dependente/edit/save/:id', perfilController.salvarEdicaoDependente);

//Chamando a rota para excluir o dependente selecionado
router.get('/dependente/delete/:id', perfilController.deletarDependente)

//Rota responsável por salvar os dados da tarefa no banco de dados
router.post('/dependente/save/:id', perfilController.salvarDependente)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas/:id', perfilController.novaReserva)

//Rota responsável por salvar os dados da reserva no banco de dados
router.post('/reservas/save/:id', perfilController.salvarReserva)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas/delete/:id', perfilController.deleteReserva)

//Chamando a rota do perfil administrador 1
router.get('/administrador/1', perfilController.loginAdministradorUm)

//Chamando a rota do perfil administrador 2
router.get('/administrador/2', perfilController.loginAdministradorDois)

//Chamando a rota do perfil administrador 2
router.post('/administrador/aprovar/:id', perfilController.aprovarNovoUsuario)
module.exports = router