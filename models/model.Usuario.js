const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

     correo: {
        type: String,
        required: false,
        trim: true
    },
})
module.exports = mongoose.model('Usuario', loginSchema  );