const sesion = require('../models/sesion');

//verificar sesion.
module.exports.getSession = (req, res) => {
    sesion.find({_id: req.params.id})
        .then(data => {
            if (data.length == 0) {
                res.send({codigo: 0, mensaje: 'Usuario no autenticado.'});
                res.end();
            } else {
                res.send({codigo: 1, mensaje: 'Usuario autenticado.'});
                res.end();
            }
        })
}

//cerrar sesión.
module.exports.getCerrarSession = (req, res) => {
    sesion.deleteOne({_id: req.params.id})
        .then(() => console.log('sesion cerrada.'))
}