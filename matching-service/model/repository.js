import mongoose from "mongoose";
import MatchModel from "./match-model.js";

let mongoDB =
    process.env.ENV == "PROD"
        ? process.env.DB_CLOUD_URI
        : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Connected successfully to database"));

export async function addMatch(params) {
    return new MatchModel(params);
}

const MATCHING_TIMEOUT = 30 * 1000;

export async function findMatch(difficultyLevel, createdAt) {
    return MatchModel.findOne({
        difficultyLevel,
        createdAt: {
            $gte: new Date(createdAt.getTime() - MATCHING_TIMEOUT),
        },
    });
}

export async function findMatchByEmail(email, createdAt) {
    return MatchModel.findOne({
        email,
        createdAt: {
            $gte: new Date(createdAt.getTime() - MATCHING_TIMEOUT),
        },
    });
}

export async function deleteMatch(id) {
    return MatchModel.findByIdAndDelete(id);
}
