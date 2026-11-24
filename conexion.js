var sequelize = require('sequelize')
var productoModelo = require('./models/producto')

//IN0szZ7NZz7prkCT
//conexion con la BD
const conexion = new sequelize('productosDSM2','2NihLKZMhp7MzJi.root','IN0szZ7NZz7prkCT',{
    host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    port: '4000',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    }
});

const producto = productoModelo(conexion);

conexion.sync({force:false})
.then(() => {
    console.log('Conexion exitosa con la BD');
})
.catch((e) => {
    console.log('Error en la conexion: '+e)
});

module.exports = {
    producto
}