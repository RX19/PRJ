const usuario = require('../models/usuario');

//agregar usuario.
module.exports.postUsuario = (req, res) => {
    res.send('Agregando usuario.');

    res.end();
}

//leer usuarios.
module.exports.getUsuarios = (req, res) => {
    res.send('Leyendo usuarios.');

    res.end();
}

//leer usuario.
module.exports.getUsuario = (req, res) => {
    res.send('Leyendo usuario ' + req.params.id);

    res.end();
}

//actualizar usuario usuario.
module.exports.putUsuario = (req, res) => {
    usuario.updateOne({_id: req.params.id}, {$set: {usuario: req.body.usuario}})
        .then(() => res.end())
}

//actualizar password usuario.
module.exports.putPassword = (req, res) => {
    usuario.updateOne({_id: req.params.id}, {$set: {password: req.body.password}})
    .then(() => res.end())
}

//eliminar usuario.
module.exports.deleteUsuario = (req, res) => {
    res.send('Eliminando usuario ' + req.params.id);

    res.end();
}

//actualizar carrito usuario.
module.exports.putCarritoUsuario = (req, res) => {
    usuario.updateOne({_id: req.params.id}, {$set: {carrito: req.body}})
        .then(() => {
            res.end();
        })
}

//obtener carrito usuario.
module.exports.getCarritoUsuario = (req, res) => {
    usuario.find({_id: req.params.id}).
        then(data => {
            if (data.length != 0) {
                res.send(data[0].carrito);
            } else {
                res.send([]);
            }
            res.end();
        })
}

//login usuario A.
module.exports.postUsuarioLoginA = (req, res) => {
    usuario.find(req.body)
        .then(data => {
            if (data.length == 0) {
                res.send({codigo: 0, mensaje: '¡Administrador no registrado!'});
                res.end();
            } else {
                req.session.nombre = data[0].nombre;

                res.send({codigo: 1, nombre: req.session.nombre, idSession: req.session.id, sesionIniciada: true});
                res.end();
            }
        })
}

//login usuario B.
module.exports.postUsuarioLoginB = (req, res) => {
    usuario.find(req.body)
        .then(data => {
            if (data.length == 0) {
                res.send({codigo: 0, mensaje: '¡Motorista no registrado!'});
                res.end();
            } else {
                if (data[0].aprobado === null) {
                    res.send({codigo: 0, mensaje: '¡Motorista aún no aprobado!'});
                    res.end();
                } else if (data[0].aprobado === true) {
                    req.session.nombre = data[0].nombre;

                    res.send({codigo: 1, id: data[0]._id, idSession: req.session.id, nombre: data[0].nombre, sesionIniciada: true});
                    res.end();
                } else {
                    res.send({codigo: 0, mensaje: '¡El motorista fue rechazado!'});
                    res.end();
                }
            }
        })
}

//registro usuario B.
module.exports.postUsuarioRegistroB = (req, res) => {
    usuario.find({usuario: req.body.usuario})
        .then(data => {
            if (data.length == 0) {
                let u = new usuario(req.body);
                u.save()
                    .then(data => {
                        res.send({codigo: 1, mensaje: 'Motorista registrado!'});
                        res.end();
                    })
                    .catch(error => {
                        res.send({codigo: 0, mensaje: '¡Error al registrar motorista!'});
                    });
            } else {
                res.send({codigo: 0, mensaje: '¡El usuario ya existe!'});
                res.end();
            }
        })
}

//login usuario C.
module.exports.postUsuarioLoginC = (req, res) => {
    usuario.find(req.body)
        .then(data => {
            if (data.length == 0) {
                res.send({codigo: 0, mensaje: '¡Usuario no registrado!'});
                res.end();
            } else {
                req.session.nombre = data[0].nombre;

                res.send({codigo: 1, nombre: req.session.nombre, idSession: req.session.id, id: data[0]._id, sesionIniciada: true});
                res.end();
            }
        })
}

//registro usuario C.
module.exports.postUsuarioRegistroC = (req, res) => {
    usuario.find({usuario: req.body.usuario})
        .then(data => {
            if (data.length == 0) {
                let u = new usuario(req.body);
                u.save()
                    .then(data => {
                        res.send({codigo: 1, mensaje: '¡Usuario registrado!'});
                        res.end();
                    })
                    .catch(error => {
                        res.send({codigo: 0, mensaje: '¡Error al registrar usuario!'});
                    });
            } else {
                res.send({codigo: 0, mensaje: '¡El usuario ya existe!'});
                res.end();
            }
        })
}

//obtener usuarios motoristas
module.exports.getUsuariosMotoristas = (req, res) => {
    usuario.find({tipo: 'B'}, {nombre: true, ordenesTomadas: true, _id: true, ordenesEntregadas: true, aprobado: true})
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    })
}

//aprobar usuario motorista.
module.exports.putUsuarioMotorista = (req, res) => {
    usuario.find({_id: req.params.id})
    .then(data => {
        let o = data[0];
        o.aprobado = req.body.aprobado;
        usuario.updateOne({_id: req.params.id}, o)
            .then(data => {
                res.send({ codigo: 1, mensaje: 'Cambios realizados.' });
                res.end();
            })
            .catch(error => {
                res.send({ codigo: 0, mensaje: 'Los cambios no han sido realizados.' });
                res.end();
            });
    })
}