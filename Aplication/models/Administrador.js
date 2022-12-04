const db = require('../db/conn')
const {DataTypes} = require('sequelize')
const Usuario = require('./Usuario')

const Administrador = db.define('Administrador', {
    perfilAcesso:{type:DataTypes.INTEGER, allowNull: false},
})

Administrador.belongsTo(Usuario)
Usuario.hasMany(Administrador)

module.exports = Administrador