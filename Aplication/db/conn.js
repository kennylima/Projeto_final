const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(
    'db_aurora', 'root', '', {host: 'localhost', dialect: 'mysql'}
)

try{
    sequelize.authenticate()

    console.log("Banco de dados conectado com sucesso!")

} catch (error){
    console.log("Erro ao conectar ao Banco de dados. "+error)
}

module.exports = sequelize