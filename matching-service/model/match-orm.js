import {
    addMatch,
    findMatch,
    findMatchByEmail,
    deleteMatch,
} from "../repository/repository.js";

export async function ormAddMatch(
    socketId,
    email,
    difficultyLevel,
    topic,
    createdAt
) {
    try {
        const newMatch = await addMatch({
            socketId,
            email,
            difficultyLevel,
            topic,
            createdAt,
        });
        newMatch.save();
    } catch (err) {
        console.log(err);
        return { err };
    }
}

export async function ormFindMatch(email, difficultyLevel, topic, createdAt) {
    return findMatch(email, difficultyLevel, topic, createdAt).catch((err) => {
        console.log(err);
        return { err };
    });
}

export async function ormFindMatchByEmail(email, createdAt) {
    return findMatchByEmail(email, createdAt).catch((err) => {
        console.log(err);
        return { err };
    });
}

export async function ormDeleteMatch(id) {
    deleteMatch(id).catch((err) => {
        console.log(err);
        return { err };
    });
}
