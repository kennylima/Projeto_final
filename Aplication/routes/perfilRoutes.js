const express           = require('express')
const router            = express.Router()
const perfilController = require ('../controllers/PerfilController')

//Chamando a rota do perfil
router.get('/', perfilController.meuPerfil)

//Chamando a rota de editar o perfil
router.get('/edit', perfilController.editarPerfil)

//Chamando a rota de salvar a edição do perfil
router.post('/edit/save', perfilController.salvarPerfil);

//Chamando a rota de cadastro de novos dependentes
router.get('/dependente', perfilController.novoDependente)

//Chamando a rota para editar os dependentes do usuário
router.get('/dependente/edit/:id', perfilController.editarDependente)

//Chamando a rota de salvar a edição do dependente
router.post('/dependente/edit/save', perfilController.salvarEdicaoDependente);

//Chamando a rota para excluir o dependente selecionado
router.get('/dependente/delete/:id', perfilController.deletarDependente)

//Rota responsável por salvar os dados da tarefa no banco de dados
router.post('/dependente/save', perfilController.salvarDependente)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas', perfilController.novaReserva)

//Rota responsável por salvar os dados da reserva no banco de dados
router.post('/reservas/save', perfilController.salvarReserva)

//Chamando a rota de cadastro de novas reservas
router.get('/reservas/delete/:id', perfilController.deleteReserva)

//Chamando a rota do perfil administrador 1
router.get('/adm1', perfilController.loginAdministradorUm)

//Chamando a rota do perfil administrador 2
router.get('/adm2', perfilController.loginAdministradorDois)

module.exports = router