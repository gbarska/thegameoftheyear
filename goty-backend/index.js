require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

//directorio publico
app.use( express.static('public') );

// Rutas
app.use( '/api/games', require('./routes/games') );
// app.use( '/api/searches', require('./routes/searches') );
app.use( '/api/uploads', require('./routes/uploads') );


//spa
app.get('*', (req, res ) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html'));
})

app.listen( process.env.PORT, () => {
    console.log('Server is listening to port ' + process.env.PORT );
});

