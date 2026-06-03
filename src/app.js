const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('¡Hola! El servidor del autoservicio de hardware está funcionando.');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});