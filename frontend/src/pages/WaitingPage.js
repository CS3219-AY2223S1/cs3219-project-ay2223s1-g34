import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import { Box, Button, Typography } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {DIFFICULTY_LEVELS, TOPICS} from "../constants"
import { URI_MATCHING_SVC, URL_MATCHING_SVC, URL_QUESTION_SVC } from "../configs";
import WaitingTimeRenderer from "../components/matching/WaitingTimeRenderer";
import RematchDialog from "../components/matching/RematchDialog";

export default function WaitingPage() {
    const [isRematchVisible, setIsRematchVisible] = useState(false);

    const [key, setKey] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const WAIT_DURATION = 30;

    const handleMatching = useCallback(async () => {
        const email = location.state.email;
        const difficultyLevel = location.state.difficultyLevel;
        const topic = location.state.topic;
        const emailToInvite = location.state.emailToInvite;

        const socket = io(URI_MATCHING_SVC, {
            withCredentials: true,
            credentials: "include",
        });

        socket.on("connect", async () => {
            console.log("connect to server");
            const req = {
                socketId: socket.id,
                email,
                difficultyLevel,
                topic,
                emailToInvite,
                createdAt: new Date().toISOString(),
            };

            await axios
                .post(URL_MATCHING_SVC, req, {
                    withCredentials: true,
                    credentials: "include",
                })
                .catch((err) => {
                    console.log(err);
                    setIsRematchVisible(true);
                });
        });

        socket.on("matching-success", async (res) => {
            console.log("matching-success");
            if (res) {
                socket.off();
                socket.disconnect();
                const roomId = res.roomId;
                var question;
                await axios
                .post(URL_QUESTION_SVC+"/getQuestion", 
                {'difficulty':DIFFICULTY_LEVELS.find(item=>item.value===difficultyLevel).label, 
                    'topic':TOPICS.find(item=>item.value===topic).label}, {
                    withCredentials: true,
                    credentials: "include",
                })
                .then((resp)=>{
                    question=resp.data.question.contents})

                navigate("/session", { state: { roomId, question, email } });
                // TODO navigate back to matching if matching cancelled
            } else {
                setIsRematchVisible(true);
            }
        });
    }, [location, setIsRematchVisible, navigate]);

    const handleMatchingFailure = () => {
        const state = location.state;
        navigate("/home", { state });
    };

    const handleRematch = () => {
        setIsRematchVisible(false);
        // restart timer
        setKey((prevKey) => prevKey + 1);

        handleMatching();
    };

    useEffect(() => {
        handleMatching();
    }, [handleMatching]);

    return (
        <Box display="flex" justifyContent="center" minHeight="100vh">
            <Box
                display="flex"
                flexDirection="column"
                width="50%"
                justifyContent="center"
            >
                <Typography
                    fontWeight="700"
                    fontSize="0.8em"
                    fontFamily="Lato"
                    color="primary.main"
                    marginBottom="1.5em"
                    align="center"
                >
                    Matching...
                </Typography>

                <Box
                    display="flex"
                    justifyContent="center"
                    marginBottom="1.5em"
                >
                    <CountdownCircleTimer
                        isPlaying
                        key={key}
                        duration={WAIT_DURATION}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[30, 20, 10, 0]}
                        onComplete={() => setIsRematchVisible(true)}
                    >
                        {WaitingTimeRenderer}
                    </CountdownCircleTimer>
                </Box>

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        onClick={handleMatchingFailure}
                        color="primary"
                        size="small"
                        variant={"contained"}
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: "0.25em",
                            letterSpacing: "1.5px",
                        }}
                    >
                        Cancel
                    </Button>
                </Box>

                <RematchDialog
                    openRematch={isRematchVisible}
                    handleRematch={handleRematch}
                    handleCancelRematch={handleMatchingFailure}
                />
            </Box>
        </Box>
    );
}
