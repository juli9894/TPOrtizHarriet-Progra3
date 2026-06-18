const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",

    storage: path.join(__dirname, "hardzone.sqlite")
});

sequelize.authenticate()
    .then(() => {
        console.log("¡Conexión a la base de datos SQLite establecida con éxito!");
    })
    .catch(error => {
        console.error("Error al conectar con la base de datos:", error);
    });

module.exports = sequelize;