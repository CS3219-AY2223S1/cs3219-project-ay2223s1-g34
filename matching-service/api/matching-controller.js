import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import { getIo } from "../socket.js";
import {
    ormAddMatch,
    ormFindMatch,
    ormDeleteMatch,
    ormFindMatchByEmail,
} from "../model/match-orm.js";

const validateRequest = (res, req) => {
    try {
        validationResult(req).throw();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Invalid request" });
        return false;
    }
    return true;
};

export async function submitMatch(req, res) {
    if (!validateRequest(res, req)) {
        return;
    }

    const { socketId, email, emailToInvite, difficultyLevel, createdAt } =
        req.body;

    var match;
    if (emailToInvite) {
        // invite match
        match = await ormFindMatchByEmail(emailToInvite, createdAt);
    } else {
        match = await ormFindMatch(email, difficultyLevel, createdAt);
    }

    if (!match || match.err) {
        const newMatch = await ormAddMatch(
            socketId,
            email,
            difficultyLevel,
            createdAt
        );

        console.log(`Match request from ${email} added`);
        return res.status(200).json({
            message: `New match request is${
                !newMatch || newMatch.err ? " not" : ""
            } added`,
        });
    }

    console.log(`Match found for ${email}`);
    await ormDeleteMatch(match.id);

    const user1SocketId = match.socketId;
    const user2SocketId = socketId;

    const user1Socket = getIo().sockets.sockets.get(user1SocketId);
    const user2Socket = getIo().sockets.sockets.get(user2SocketId);

    const MATCHING_FAILURE = "matching-failure";
    const MATCHING_SUCCESS = "matching-success";

    if (!user1Socket || !user2Socket) {
        getIo().to(user1Socket).to(user2Socket).emit(MATCHING_FAILURE);
        console.log(`Matching attempt for ${email} failed`);
        return res.status(200).json({ message: "Matching failure" });
    }

    const roomId = uuidv4();
    user1Socket.emit(MATCHING_SUCCESS, { roomId });
    user2Socket.emit(MATCHING_SUCCESS, { roomId });
    console.log(`Matching success ${email}`);
    return res.status(200).json({ message: "Matching success" });
}
