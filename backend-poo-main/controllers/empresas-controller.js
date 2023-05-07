const empresa = require('../models/empresa');
const producto = require('../models/producto');

//agregar empresa.
module.exports.postEmpresa = (req, res) => {
    let e = new empresa({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,
        codigoCategoria: req.body.codigoCategoria,
        calificacion: req.body.calificacion,
        logo: `http://localhost:4200/public/${req.files.logo[0].originalname}`,
        banner: `http://localhost:4200/public/${req.files.banner[0].originalname}`
    });

    e.save()
    .then(data => {
        res.send({codigo: 1, mensaje: 'Empresa agregada con éxito.'});
        res.end();
    })
    .catch(error => {
        res.send({codigo:0, mensaje: 'Error al añadir la empresa.'});
        res.end();
    });
}

//leer empresas.
module.exports.getEmpresas = (req, res) => {
    empresa.find()
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//leer empresa.
module.exports.getEmpresa = (req, res) => {
    empresa.find({_id: req.params.id})
    .then(data => {
        res.send(data[0]);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//actualizar empresa.
module.exports.putEmpresa = (req, res) => {
    if (req.files['banner']) {
        req.body.banner = `http://localhost:4200/public/${req.files.banner[0].originalname}`
    }

    if (req.files['logo']) {
        req.body.logo = `http://localhost:4200/public/${req.files.logo[0].originalname}`
    }

    empresa.updateOne({_id: req.params.id}, req.body)
    .then(data => {
        res.send({codigo: 1, mensaje: 'empresa actualizada!'});
        res.end();
    })
    .catch(error => {
        res.send({codigo: 0, mensaje: 'Error al actualizar la empresa'});
        res.end();
    });
}

//eliminar empresa.
module.exports.deleteEmpresa = (req, res) => {
    producto.deleteMany({codigoEmpresa: req.params.id})
    empresa.deleteOne({_id: req.params.id})
    .then(() => {
        res.send({codigo: 1, mensaje: 'Empresa eliminada.'});
    })
    .catch(() => {
        res.send({codigo: 0, mensaje: 'No se eliminó la empresa.'});
    });
}