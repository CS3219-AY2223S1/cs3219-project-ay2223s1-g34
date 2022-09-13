import { Schema, model } from "mongoose";

let MatchSchema = new Schema({
    socketId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("MatchModel", MatchSchema);
