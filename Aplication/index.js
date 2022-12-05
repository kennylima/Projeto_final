const express   = require ('express')
const expbhs    = require ('express-handlebars')
const conn      = require('./db/conn')
const app       = express()

// //Configurando o template engine
app.engine('handlebars', expbhs.engine())
app.set('view engine', 'handlebars')

//Middlewares para receber dados dos formulários
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Models
const Usuario = require('./models/Usuario') //Usuário
const Associado = require('./models/Associado') //Associado
const Administrador = require('./models/Administrador') //Administrador
const Dependente = require('./models/Dependente') //Dependente
const Reserva = require('./models/Reserva') //Reserva

//Rota principal
app.get('/', (req, res)=>{
    res.render('home')
})

//Rotas
const usuariosRoutes = require('./routes/usuariosRoutes')
const dependentesRoutes = require('./routes/dependentesRoutes')

//Utilização de rotas
app.use('/cadastrar', usuariosRoutes)
app.use('/perfil', dependentesRoutes)


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

app.post('/editarPerfil/save', async (req, res) =>{
    const id                = req.body.id
    const nome              = req.body.nome
    const cpf               = req.body.cpf
    const email             = req.body.email
    const senha             = req.body.senha

    await Usuarios.update({nome, cpf, email, senha})

    const telefone = req.body.telefone
    const matriculaEmpresa = req.body.matriculaEmpresa

    await Associados.update({telefone,matriculaEmpresa})
    
    conn.query( (erro) => {
        if(erro){
            console.log(erro);
            return
        }    
        res.redirect(`/perfil`);   
    });

});

// //Rota para adicionar dependente
// app.get('/perfil/dependente', (req, res) =>{
//     res.render('dependente')
// });

// app.post('/perfil/dependente/save', (req, res) =>{
    
// });

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
conn.sync().then(()=>{
    app.listen(3000)
}).catch((erro)=> {
    console.log(erro)
})