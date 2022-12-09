const {DataTypes} = require('sequelize')
const db = require('../db/conn')

//Função para cadastrar a tabela associado no BD
const Associado = db.define('Associado', {
    nome:{type:DataTypes.STRING(1000), allowNull: false},
    cpf:{type:DataTypes.STRING(14), allowNull: false},
    telefone:{type:DataTypes.STRING(100), allowNull: false},
    matriculaEmpresa:{type:DataTypes.STRING(14), allowNull: false},
    email:{type:DataTypes.STRING(100), allowNull: false},
    senha:{type:DataTypes.STRING(1000), allowNull: false},
    status:{type:DataTypes.BOOLEAN, allowNull: false}
})

module.exports = Associado