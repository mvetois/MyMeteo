import mongoose, { Schema } from "mongoose";

const CitiesSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    codePst: {
        type: Array,
        required: true
    },
    codeDpt: {
        type: String,
        required: true
    },
    nameDpt: {
        type: String,
        required: true
    },
    coord: {
        type: Array,
        required: true
    }
});

export const Cities = mongoose.model("Cities", CitiesSchema);