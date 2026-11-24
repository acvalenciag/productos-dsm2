var router = require('express').Router()
const { where } = require('sequelize')
var {producto} = require('../conexion')


//ruta raiz
router.get('/',(req,res) => {
    res.render('pages/index')
})

//ruta para la pagina de insertar
router.get('/insertarProducto', (req,res) => {
    res.render('pages/insertarProducto')
})

//ruta o petición para insertar un registro (producto nuevo)
router.post('/guardarProducto', (req,res) => {
    producto.create(req.body)
    .then(() =>{
        console.log('Se insertó correctamente')
        res.redirect('/listarProductos')
    })
    .catch((e) => {
        console.log('Error al insertar: '+e)
    })
})

//ruta o petición para obtener todos los productos
router.get('/listarProductos', (req,res) => {
    producto.findAll()
    .then((data) => {
        res.render('pages/listarProductos', {productos: data})
    })
    .catch((e) => {
        console.log('Error en la consulta: '+e)
    })
})

//ruta o petición para obtener un producto por su ID
router.get('/buscarProducto/:idProducto',(req,res) => {
    producto.findAll({
        where:{
            idProducto: req.params.idProducto
        }
    })
    .then((data) => {
        res.render('pages/modificarProducto',{producto: data})
    })
    .catch((e) => {
        console.log('Error en la consulta: '+e)
    })
})

//ruta o petición para modificar un producto existente
router.post('/modificarProducto', (req,res) => {
    var idProducto = req.body.idProducto;
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    }
    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
    .then(()=> {
        console.log('Se modificó correctamente el producto')
        res.redirect('/listarProductos')
    })
    .catch((e) => {
        console.log('Error al modificar: '+e)
    })
})

//ruta o petición para eliminar un producto
router.get('/eliminarProducto/:idProducto', (req,res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then(() =>{
        console.log('Se eliminó exitosamente el producto')
        res.redirect('/listarProductos')
    })
    .catch((e) => {
        console.log('Error al eliminar: '+e)
    })
})

module.exports = router;
