import mongoose from "mongoose";

const Top = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    motCle: {
        chip1: {
            type: String
        },
        chip2: {
            type: String
        },
        chip3: {
            type: String
        },
        chip4: {
            type: String
        },
        chip5: {
            type: String
        }
    },
    choix: {
        choix1: {
            type: String
        },
        choix2: {
            type: String
        },
        choix3: {
            type: String
        },
        choix4: {
            type: String
        },
        choix5: {
            type: String
        },
        choix6: {
            type: String
        },
        choix7: {
            type: String
        },
        choix8: {
            type: String
        },
        choix9: {
            type: String
        },
        choix10: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Tops', Top);