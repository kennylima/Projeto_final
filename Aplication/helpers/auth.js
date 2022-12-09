//Função para verificar se o usuário está logado
module.exports.checarLogado = function (req, res, next){
    const userId = req.session.userId;
    if(!userId){
        res.redirect('/login');
    }
    next();
}

//Função para verificar se um administrador está logado
module.exports.checarAdm = function (req, res, next){
    const userAdm = req.session.userAdm;
    const userId = req.session.userId;

    if(!userId){
        res.redirect('/login');
    }
    
    if(!userAdm){
        res.redirect(`/perfil/${userId}`);
    }
    next();
}