const mongoose = require('mongoose');


const JobsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "el título es requerido"]
    },
    description: {
        type: String,
        required: [true, "La descripción es requerido"]
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, "La status es requerido"]
    },
    company: {
        type: String,
        required: [true, "La empresa es requerida"]
    }
}, {
    timestamps: true,
    versionKey: false
})

const model = mongoose.model("Job", JobsSchema);

module.exports = model;