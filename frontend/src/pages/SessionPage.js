import {
	Box,
	Button,
	TextField,
	Typography,
} from "@mui/material";

import { useEffect, useCallback} from "react";
import io from 'socket.io-client'
import { URI_COLLAB_SVC } from "../configs";
import { useNavigate,useLocation } from "react-router-dom";

function getEl(id) {
    return document.getElementById(id)
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
            query: {id: sessionId}
        });

        const editor = getEl("editor")
        const chatfield = getEl("chatfield")
        const chatbox = getEl("chatbox")
        editor.addEventListener("keyup", (evt)=>{
            const text = editor.value
            socket.emit('editor', {content: text, to: sessionId})
        })
        chatfield.addEventListener("keypress", (evt) => {
            evt.preventDefault()
            if (evt.key === "Enter" && chatfield.value) {
                chatbox.value += "Me: " + chatfield.value +"\n"
                chatbox.scrollTo(0,chatbox.scrollHeight);
                socket.emit('chat',{message:chatfield.value, to: sessionId})
                chatfield.value = "";
            } else if(evt.key !== "Enter") {
                chatfield.value += evt.key
            }
        })
        socket.on('editor', (data) =>{
            editor.value = data
        })

        socket.on('chat', (data) => {
            chatbox.value += "Partner: " + data +"\n"
            chatbox.scrollTo(0,chatbox.scrollHeight);
        })
    }, [location,navigate]);
    
    function sessionClose() {
        const state = location.state
        socket.close()
        navigate("/home",{state})
    }

    useEffect(() => {handleSession()},[handleSession])

    return(
        <Box display="flex" flexDirection="row" height="100vh">
			<Box
				display="flex"
				flexDirection="row"
				backgroundColor="secondary.main"
				width="100%"
				alignItems="center">
                <Box
                    display = "flex"
                    flexDirection = "column"
                    backgroundColor="secondary.main"
                    width = "30%"
                    height = "90%"
                    borderRight={10}
                    borderColor = "secondary.main"
                    back
                >

                    <TextField 
                        id = "chatbox"
                        multiline={true}
                        minRows={5}
                        maxRows={5}
                        InputProps = {{readOnly: true}}
                        placeholder = "Chatbox here"
                        height = "70%"
                    >
                    </TextField >
                    <TextField 
                        id = "chatfield"
                        height = "30%"
                        multiline
                        variant="standard"
                        placeholder = "Enter here"
                        sx={{marginTop: "0.2em", marginBottom:"0.2em"}}
                    >
                    </TextField >
                    <Button 
                        id = "finish-button"
                        variant="contained"
                        onClick = {sessionClose}
                    >
                        Finish
                    </Button>
                </Box>
                <Box
					display="flex"
					flexDirection="column"
					width="70%"
					height="100%"
					justifyContent="center"
				>
                    <Typography>
                        {location.state.question}
                    </Typography>
					<TextField
                        id="editor"
                        size="medium"
                        rows={3}
                        placeholder="Enter your code here"
                        multiline={true}
					>
					</TextField>
                </Box>
            </Box>
        </Box>
    )
}