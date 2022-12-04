const db = require('../db/conn')
const {DataTypes} = require('sequelize')


const Usuario = db.define('Usuario', {
    nome:{type:DataTypes.STRING(1000), allowNull: false},
    cpf:{type:DataTypes.STRING(14), allowNull: false},
    email:{type:DataTypes.STRING(100), allowNull: false},
    senha:{type:DataTypes.STRING(1000), allowNull: false},
})

module.exports = Usuario