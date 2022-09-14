import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import { Box, Button, Typography } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { URI_MATCHING_SVC, URL_MATCHING_SVC } from "../../configs";
import RematchDialog from "../components/matching/RematchDialog";

export default function WaitingPage() {
    const [isRematchVisible, setIsRematchVisible] = useState(false);

    const [key, setKey] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const handleMatching = async () => {
        const email = location.state.email;
        const difficultyLevel = location.state.difficultyLevel;
        const emailToInvite = location.state.emailToInvite;

        const socket = io(URI_MATCHING_SVC);
        const socketId = socket.id;
        socket.on(
            "connection",
            async () =>
                await axios
                    .post(
                        URL_MATCHING_SVC,
                        {
                            socketId,
                            email,
                            difficultyLevel,
                            emailToInvite,
                            createdAt: Date.now,
                        },
                        { withCredentials: true, credentials: "include" }
                    )
                    .then(res => console.log("connection res:\n" + res))
                    .catch((err) => {
                        console.log(err);
                        setIsRematchVisible(true);
                    })
        );

        socket.on("matching-success", async (res) => {
            console.log("matching-success");
            console.log(res);
            if (res) {
                socket.off();
                socket.disconnect();
                const roomId = res.roomId;
                console.log(roomId);
                setIsWaitingVisible(false);
                navigate("/question", { state: { roomId } });
                // TODO navigate back to matching and leave room in question page
            } else {
                setIsRematchVisible(true);
            }
        });
    };

    const handleMatchingFailure = () => navigate("/home");

    const handleRematch = () => {
        setIsRematchVisible(false);
        // restart timer
        setKey((prevKey) => prevKey + 1);

        handleMatching();
    };

    useEffect(() => {
        handleMatching();
    });

    return (
        <Box display="flex" justifyContent="center" minHeight="100vh">
            <Box
                display="flex"
                flexDirection="column"
                width="70%"
                justifyContent="center"
            >
                <Typography
                    fontWeight="700"
                    fontSize="0.8em"
                    fontFamily="Lato"
                    color="primary.main"
                    marginBottom="1.5em"
                >
                    Matching...
                </Typography>

                <CountdownCircleTimer
                    isPlaying
                    key={key}
                    duration={30}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[30, 20, 10, 0]}
                    onComplete={() => setIsRematchVisible(true)}
                >
                    {WaitingTimeRenderer}
                </CountdownCircleTimer>

                <Button
                    onClick={handleMatchingFailure}
                    color="primary"
                    size="large"
                    variant={"contained"}
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "0.25em",
                        letterSpacing: "1.5px",
                    }}
                >
                    Cancel
                </Button>

                <RematchDialog
                    openRematch={isRematchVisible}
                    handleRematch={handleRematch}
                    handleCancelRematch={() => setIsRematchVisible(false)}
                />
            </Box>
        </Box>
    );
}
