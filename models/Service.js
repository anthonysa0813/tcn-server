const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    title: {
        type: String,
        required: [true, "el titulo es requerido"]
    },
    company: {
        type: String,
        required: [true, "la compañia es requerido"]
    },
    description: {
        type: String,
        required: [true, "La descripción es requerida"]
    },
    categoryType: {
        type: String,
        required: false
    },
    employees: [{
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: false
        }]
    
}, {
    timestamps: true,
})

const model = mongoose.model("Service", ServiceSchema );

module.exports = model;