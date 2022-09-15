import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";

import { DIFFICULTY_LEVELS } from "../../constants";

function Matching({ email }) {
    const [isInviteVisible, setIsInviteVisible] = useState("");
    // TODO add topics

    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [emailToInvite, setEmailToInvite] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmitMatch = async () => {
        // TODO validate other fields and show error message

        if (!difficultyLevel) {
            setErrorMessage("Select a difficulty level");
        }

        navigate("/waiting", {
            state: { email, difficultyLevel, emailToInvite },
        });
    };

    return (
        <Box display="flex" justifyContent="center" minHeight="80vh">
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
                    Find a Match
                </Typography>
                <TextField
                    select
                    label="Difficulty Level"
                    defaultValue={DIFFICULTY_LEVELS[1]}
                    fullWidth
                    size="medium"
                    variant="standard"
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    sx={{ marginBottom: "0.4em" }}
                    InputProps={{ style: { fontSize: "0.4em" } }}
                    InputLabelProps={{ style: { fontSize: "0.4em" } }}
                    autoFocus
                >
                    {DIFFICULTY_LEVELS.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            size="medium"
                            sx={{ fontSize: "0.4em" }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {isInviteVisible && (
                    <TextField
                        label="Email Address of User to Invite"
                        fullWidth
                        size="medium"
                        variant="standard"
                        value={emailToInvite}
                        onChange={(e) => setEmailToInvite(e.target.value)}
                        sx={{ marginBottom: "0.4em" }}
                        InputProps={{ style: { fontSize: "0.4em" } }}
                        InputLabelProps={{ style: { fontSize: "0.4em" } }}
                        autoFocus
                    ></TextField>
                )}
                {!isInviteVisible && (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        marginBottom="0.5em"
                    >
                        <Button
                            onClick={() => setIsInviteVisible(true)}
                            color="primary"
                            size="medium"
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "0.4em",
                                textTransform: "none",
                                width: "fit-content",
                                opacity: "70%",
                                "&:hover": {
                                    backgroundColor: "#FFFFFF",
                                    fontWeight: "700",
                                    opacity: "75%",
                                },
                            }}
                        >
                            Invite a user
                        </Button>
                    </Box>
                )}
                <Typography
                    fontSize="0.25em"
                    fontFamily="Poppins"
                    color="error.main"
                    align="center"
                    marginBottom="1em"
                >
                    {errorMessage}
                </Typography>
                <Button
                    onClick={handleSubmitMatch}
                    color="primary"
                    size="large"
                    variant={"contained"}
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "0.25em",
                        letterSpacing: "1.5px",
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default Matching;
