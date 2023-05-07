const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    cantidad: Number,
    precio: Number,
    imagen: String,
    codigoEmpresa: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('productos', schema);