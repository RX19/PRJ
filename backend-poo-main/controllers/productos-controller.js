const producto = require('../models/producto');

//agregar producto.
module.exports.postProducto = (req, res) => {
    let p = new producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        imagen: `http://localhost:4200/public/${req.file.originalname}`,
        codigoEmpresa: req.body.codigoEmpresa
    });
    p.save()
    .then(data => {
        res.send({codigo: 1, mensaje: 'Producto agregado con éxito.'});
        res.end();
    })
    .catch(error => {
        res.send({codigo:0, mensaje: 'Error al añadir le producto.'});
        res.end();
    });
}

//leer productos.
module.exports.getProductos = (req, res) => {
    producto.find()
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//leer producto.
module.exports.getProducto = (req, res) => {
    producto.find({_id: req.params.id})
    .then(data => {
        res.send(data[0]);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//actualizar producto.
module.exports.putProducto = (req, res) => {
    if (req.file) {
        req.body.imagen = `http://localhost:4200/public/${req.file.originalname}`
    }
    producto.updateOne({_id: req.params.id}, {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        imagen: req.body.imagen,
        codigoEmpresa: req.body.codigoEmpresa
    })
    .then(data => {
        res.send({codigo: 1, mensaje: 'Producto actualizado!'});
        res.end();
    })
    .catch(error => {
        res.send({codigo: 0, mensaje: 'Error al actualizar el producto.'});
        res.end();
    });
}

//eliminar producto.
module.exports.deleteProducto = (req, res) => {
    producto.deleteOne({_id: req.params.id})
    .then(() => {
        res.send({codigo: 1, mensaje: 'Producto eliminado.'});
    })
    .catch(() => {
        res.send({codigo: 0, mensaje: 'No se eliminó el producto.'});
    });
}

//actualizar cantidad del producto.
module.exports.putCantidad = (req, res) => {
    producto.find({_id: req.params.id})
        .then(data => {
            let cant = data[0].cantidad
            cant = cant - req.body.cantidad
            producto.updateOne({_id: req.params.id}, {$set: {cantidad: cant}})
                .then(() => res.end())
        })
}