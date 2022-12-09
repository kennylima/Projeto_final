const db = require('../db/conn')
const {DataTypes} = require('sequelize')
const Associado = require('./Associado')

//Função para cadastrar a tabela dependente no BD
const Dependente = db.define('Dependente', {
    nome:{type:DataTypes.STRING(1000), allowNull: false},
    telefone:{type:DataTypes.STRING(100), allowNull: false},
    parentesco:{type:DataTypes.STRING(100), allowNull: false},
})

Dependente.belongsTo(Associado)
Associado.hasMany(Dependente)

module.exports = Dependente