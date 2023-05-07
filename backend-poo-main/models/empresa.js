const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    telefono: String,
    calificacion: Number,
    direccion: String,
    correo: String,
    logo: String,
    banner: String,
    codigoCategoria: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('empresas', schema);