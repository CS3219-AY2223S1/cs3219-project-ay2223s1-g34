import {
	Box,
	Button,
	TextField,
	Typography,
	Toolbar,
	AppBar,
} from "@mui/material";

import { useEffect, useCallback, useState } from "react";
import io from "socket.io-client";
import { URI_COLLAB_SVC } from "../configs";
import { useNavigate, useLocation } from "react-router-dom";
import MonacoEditor from "react-monaco-editor";

function getEl(id) {
	return document.getElementById(id);
}

export default function SessionPage() {
	let socket;
	let editor;
	const location = useLocation();
	const navigate = useNavigate();
	const username = location.state.username;
	const topic = location.state.topic;
	const sessionId = location.state.roomId;
	const [editorText, setEditorText] = useState();

	socket = io(URI_COLLAB_SVC, {
		withCredentials: true,
		credentials: "include",
		query: { id: sessionId },
		transports: ["websocket","polling"]
	});

	const onMount = (input) => {
		editor = input;
		setEditorText("Enter your code here!");
	};

	const handleEditorChange = (text) => {
		setEditorText(text);
		console.log(editorText);
	};
	const handleSession = useCallback(async () => {
		const chatfield = getEl("chatfield");
		const chatbox = getEl("chatbox");

		const updateChatbox = (text) => {
			chatbox.value += text + "\n";
			chatbox.scrollTo(0, chatbox.scrollHeight);
		};

		if (location.state.isInviteMatched) {
			updateChatbox("Successful matching via invitation");
		}

		editor.onKeyUp(() => {
			socket.emit("editor", {
				content: editor.getValue(),
				to: sessionId,
			});
		});

		chatfield.addEventListener("keypress", (evt) => {
			evt.preventDefault();
			if (evt.key === "Enter" && chatfield.value) {
				updateChatbox(username + ": " + chatfield.value);
				socket.emit("chat", {
					message: username + ": " + chatfield.value,
					to: sessionId,
				});
				chatfield.value = "";
			} else if (evt.key !== "Enter") {
				chatfield.value += evt.key;
			}
		});

		socket.on("editor", (data) => {
			handleEditorChange(data);
		});

		socket.on("chat", (data) => updateChatbox(data));
		socket.on("exit", () => updateChatbox("Partner left session"));
	}, [location, navigate]);

	function sessionClose() {
		const sessionId = location.state.roomId;
		socket.emit("exit", { to: sessionId },()=>{socket.close()});

		const state = location.state;
		navigate("/home", { state });
	}

	useEffect(() => {
		handleSession();
	}, [handleSession]);

	return (
		<Box display="flex" flexDirection="column" height="100vh">
			<AppBar position="fixed" color="primary">
				<Toolbar>
					<Typography
						sx={{
							fontFamily: "Lato",
							fontSize: "0.5em",
							fontWeight: "700",
							padding: "0",
							margin: "0",
							verticalAlign: "middle",
						}}
					>
						PeerPrep
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Box display="flex" flexDirection="row" height="100%">
				<Box
					display="flex"
					flexDirection="column"
					width="50%"
					height="100%"
					justifyContent="space-between"
				>
					<Box
						margin="0.25em"
						padding="0.2em"
						sx={{
							display: "flex",
							flexDirection: "column",
							overflow: "hidden",
							overflowY: "scroll",
							border: 1,
							borderRadius: 1,
							height: "28vh",
						}}
					>
						<Typography fontSize="0.35em" fontFamily="Lato">
							Difficulty: {location.state.difficultyLevel}
						</Typography>
						<Typography fontSize="0.35em" fontFamily="Lato">
							Topic: {location.state.topic}
						</Typography>
						<Typography
							fontSize="0.35em"
							fontFamily="Lato"
							style={{ wordWrap: "break-word" }}
						>
							Question: {location.state.question}
						</Typography>
					</Box>
					<Box
						padding="0.25em"
						margin="0.25em"
						sx={{
							border: 1,
							borderRadius: 1,
						}}
					>
						<TextField
							id="chatbox"
							multiline={true}
							minRows={10}
							maxRows={10}
							margin="0.1em"
							fullWidth
							InputProps={{
								readOnly: true,
								style: {
									fontFamily: "Poppins",
									fontSize: "0.3em",
									height: "35vh",
								},
							}}
							placeholder="Chatbox here"
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
						height="70vh"
						width="90%"
						padding="0.25em"
						margin="0.25em"
						sx={{
							border: 1,
							borderRadius: 1,
							borderColor: "secondary.main",
							display: "flex",
							flexDirection: "column",
							overflow: "hidden",
							overflowY: "scroll",
						}}
						id="chatbox"
					>
						<MonacoEditor
							options={{
								automaticLayout: true,
								minimap: {
									enabled: false,
								},
							}}
							id="editor"
							theme="vs-dark"
							value={editorText}
							editorDidMount={onMount}
							onChange={handleEditorChange}
						/>
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
		</Box>
	);
}
