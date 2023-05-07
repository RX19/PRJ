const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    idCliente: String,
    nombre: String,
    estado: String,
    cliente: {
        nombre: String,
        celular: String,
        correo: String
    },
    envio: {
        productos: Array,
        direccion: String,
        empresa: String,
        subtotal: Number,
        total: Number,
        coordenadas: {
            longitud: Number,
            latitud: Number
        },
        estado: String | null,
        isv: Number,
        comisionMotorista: Number,
        comisionAdministrador: Number
    },
    motorista: mongoose.Schema.Types.ObjectId | null
});

module.exports = mongoose.model('ordenes', schema);