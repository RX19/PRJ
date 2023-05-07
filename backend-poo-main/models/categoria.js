const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model('categorias', schema);