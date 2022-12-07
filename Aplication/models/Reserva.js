const db = require('../db/conn')
const {DataTypes} = require('sequelize')
const Associado = require('./Associado')

const Reserva = db.define('Reserva', {
    local:{type:DataTypes.STRING(1000), allowNull: false},
    data:{type:DataTypes.DATEONLY, allowNull: false},
})

Reserva.belongsTo(Associado)
Associado.hasMany(Reserva)

module.exports = Reserva