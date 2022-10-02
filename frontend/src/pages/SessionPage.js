import { Box, Button, TextField, Typography, Paper } from "@mui/material";

import { useEffect, useCallback } from "react";
import io from "socket.io-client";
import { URI_COLLAB_SVC } from "../configs";
import { useNavigate, useLocation } from "react-router-dom";

function getEl(id) {
	return document.getElementById(id);
}

export default function SessionPage() {
	let socket;
	const location = useLocation();
	const navigate = useNavigate();

	const handleSession = useCallback(async () => {
		const sessionId = location.state.roomId;

		socket = io(URI_COLLAB_SVC, {
			withCredentials: true,
			credentials: "include",
			query: { id: sessionId },
		});

		const editor = getEl("editor");
		const chatfield = getEl("chatfield");
		const chatbox = getEl("chatbox");
		editor.addEventListener("keyup", (evt) => {
			const text = editor.value;
			socket.emit("editor", { content: text, to: sessionId });
		});
		chatfield.addEventListener("keypress", (evt) => {
			evt.preventDefault();
			if (evt.key === "Enter" && chatfield.value) {
				chatbox.value += "Me: " + chatfield.value + "\n";
				chatbox.scrollTo(0, chatbox.scrollHeight);
				socket.emit("chat", {
					message: chatfield.value,
					to: sessionId,
				});
				chatfield.value = "";
			} else if (evt.key !== "Enter") {
				chatfield.value += evt.key;
			}
		});
		socket.on("editor", (data) => {
			editor.value = data;
		});

		socket.on("chat", (data) => {
			chatbox.value += "Partner: " + data + "\n";
			chatbox.scrollTo(0, chatbox.scrollHeight);
		});
	}, [location, navigate]);

	function sessionClose() {
		const state = location.state;
		socket.close();
		navigate("/home", { state });
	}

	function sessionClose() {
		const state = location.state;
		socket.close();
		navigate("/home", { state });
	}

	useEffect(() => {
		handleSession();
	}, [handleSession]);

	return (
		<Box display="flex" flexDirection="row" height="100vh">
			<Box
				display="flex"
				flexDirection="column"
				width="50%"
				height="100%"
				justifyContent="space-between"
			>
				<Box margin="0.25em">
					<Typography fontSize="0.35em" fontFamily="Lato">
						Difficulty:
					</Typography>
					<Typography fontSize="0.35em" fontFamily="Lato">
						Topic:
					</Typography>
					<Typography fontSize="0.35em" fontFamily="Lato">
						Question: {location.state.question}
					</Typography>
				</Box>
				<Box
					height="100%"
					padding="0.25em"
					margin="0.25em"
					sx={{ border: 1 }}
				>
					<TextField
						id="chatbox"
						multiline={true}
						minRows={5}
						maxRows={5}
						InputProps={{ readOnly: true }}
						placeholder="Chatbox here"
						height="70%"
					></TextField>
				</Box>
				<TextField
					id="chatfield"
					placeholder="Message"
					InputProps={{
						style: { fontFamily: "Poppins", fontSize: "0.3em" },
					}}
					sx={{
						margin: "0.25em",
					}}
				></TextField>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				backgroundColor="primary.main"
				width="50%"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box
					height="100%"
					width="90%"
					padding="0.25em"
					margin="0.25em"
					sx={{ border: 1, borderColor: "secondary.main" }}
					id="chatbox"
				>
					<TextField
						fullWidth
						id="editor"
						variant="standard"
						placeholder="Enter your code here"
						InputProps={{
							disableUnderline: true,
							style: {
								fontFamily: "Poppins",
								fontSize: "0.3em",
								color: "#FFFFFF",
							},
						}}
						multiline={true}
					></TextField>
				</Box>
				<Button
					id="finish-button"
					color="error"
					variant="outlined"
					onClick={sessionClose}
					sx={{
						margin: "1em",
						fontFamily: "Poppins",
						fontSize: "0.3em",
						letterSpacing: "1.5px",
						width: "95%",
					}}
				>
					Finish
				</Button>
			</Box>
		</Box>
	);
}
