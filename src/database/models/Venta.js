const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productos: {
        type: DataTypes.JSON,
        allowNull: false
    },
    precio_final: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'ventas',
    timestamps: true
});

module.exports = Venta;

/*
await Venta.create({
    cliente: "Mauricio",
    productos: [
        {
            producto: "RTX 3080",
            cantidad: 1,
            precio: 800000
        },
        {
            producto: "Ryzen 5 5600X",
            cantidad: 1,
            precio: 250000
        },
        {
            producto: "Mouse Logitech",
            cantidad: 2,
            precio: 50000
        }
    ],
    precio_final: 1150000
});
*/