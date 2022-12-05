//Chamando a página de cadastro
module.exports = class LoginController {
    static novoLogin(req, res) {
        res.render('login')
    }
}
