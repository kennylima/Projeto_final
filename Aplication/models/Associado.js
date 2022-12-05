const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Usuario = require('./Usuario')

const Associado = db.define('Associado', {
    telefone:{type:DataTypes.STRING(100), allowNull: false},
    matriculaEmpresa:{type:DataTypes.STRING(14), allowNull: false},
    status:{type:DataTypes.BOOLEAN, allowNull: false},
})

Associado.belongsTo(Usuario)
Usuario.hasMany(Associado)


module.exports = Associado