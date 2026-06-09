const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.STRING,
        defaultValue: 'default.png'
    }
}, {
    tableName: 'productos', 
    timestamps: false 
});

module.exports = Producto;