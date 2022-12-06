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

//Importação dos Models 
const Associado = require('./models/Associado') //Associado
const Administrador = require('./models/Administrador') //Administrador
const Dependente = require('./models/Dependente') //Dependente
const Reserva = require('./models/Reserva') //Reserva

//Rotas
const associadoRoutes        = require('./routes/associadoRoutes')
const loginRoutes           = require('./routes/loginRoutes')
const perfilRoutes          = require('./routes/perfilRoutes')
const listarDependentes     = require('./controllers/PerfilController')

//Utilização de rotas
app.use('/cadastrar', associadoRoutes)
app.use('/login', loginRoutes)
app.use('/perfil', perfilRoutes)

//Rota principal
app.get('/', (req, res)=>{
    res.render('home')
})

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