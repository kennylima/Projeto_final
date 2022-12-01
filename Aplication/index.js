const express   = require ('express')
const expbhs    = require ('express-handlebars')
const conn      = require('./db/conn')
const app       = express()

// //Configurando o template engine
app.engine('handlebars', expbhs.engine())
app.set('view engine', 'handlebars')

//Middlewares para receber dados dos formulários
app.use(
    express.urlencoded({extended: true})
);
app.use(express.json());

//Rota principal
app.get('/', (req, res)=>{
    res.render('home')
})

//Rota de cadastro
app.get('/cadastrar', (req, res) =>{

    if(perfilAcesso == "Associado"){
        //Inserir dados na tabela usuário
        const sqlUsuario = `SELECT ??, ??, ??, ??, ?? FROM ??`;

        const arrayUsuario = ['id_usuario', 'email', 'senha', 'nome', 'cpf', 
                        'usuario'];
    
        //Inserir dados na tabela associado
        const sqlAssociado = `SELECT ??, ??, ??, I, FROM ??`;

        const arrayAssociado = ['id_associado', 'matriculaEmpresa', 'Telefone', 'status', 
                        'associado'];

        conn.query(sqlUsuario, arrayUsuario, sqlAssociado, arrayAssociado,(erro, cadastrar) => {
            if(erro){
                console.log(erro);
                return
            }   
            res.render('cadastrar', {cadastrar});       
        });

    } else{
        //Inserir dados na tabela usuário
        const sqlUsuario = `SELECT ??, ??, ??, ??, ?? FROM ??`;

        const arrayUsuario = ['id_usuario', 'email', 'senha', 'nome', 'cpf', 
                        'usuario'];
        
        //Inserir dados na tabela administrador
        const sqlAdministrador = `SELECT ??, ??, FROM ??`;
        
        const arrayAssociado = ['id_administrador', 'perfilAcesso', 
                        'administrador'];

            conn.query(sqlUsuario, arrayUsuario, sqlAdministrador, arrayAssociado, (erro, cadastrar) => {
                if(erro){
                    console.log(erro);
                    return
                }   
                res.render('cadastrar', {cadastrar});       
            }); 
    }
});

//Rota para logar
app.get('/login', (req, res) =>{
    res.render('login')
});

//Rota do perfil
app.get('/perfil', (req, res) =>{
    res.render('perfil')
});

//Rota para editar o perfil
app.get('/editarPerfil', (req, res) =>{
    res.render('editar-perfil')
});

//Rota para adicionar dependente
app.get('/perfil/dependente', (req, res) =>{
    res.render('dependente')
});

//Rota para reservar quiosque
app.get('/perfil/reservas', (req, res) =>{
    res.render('reservas')
});

//Rota para perfil administrativo nível 1
app.get('/adm1', (req, res) =>{
    res.render('perfilAdmUm')
});

//Rota para perfil administrativo nível 2
app.get('/adm2', (req, res) =>{
    res.render('perfilAdmDois')
});

//Rota para pesquisa de associado (Nível 1)
app.get('/pesquisar1', (req, res) =>{
    res.render('resultadoPesquisaUm')
});

//Rota para pesquisa de associado (Nível 2)
app.get('/pesquisar2', (req, res) =>{
    res.render('resultadoPesquisaDois')
});

//Conexão BD
conn.sync()
.then(
    app.listen(3000)
).catch((erro) => console.log(erro))