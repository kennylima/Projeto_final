const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Administrador = db.define('Administrador', {
    nome:{type:DataTypes.STRING(500), allowNull: false},
    email:{type:DataTypes.STRING(500), allowNull: false},
    senha:{type:DataTypes.STRING(1000), allowNull: false},
    nivelAcesso:{type:DataTypes.BOOLEAN, allowNull: false},
})

module.exports = Administrador