import {
	Box,
	Button,
	TextField,
    TextareaAutosize,
	Typography,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle
} from "@mui/material";

import { useState, useEffect } from "react";
import io from 'socket.io-client'
import axios from "axios";
import { URL_COLLAB_SVC } from "../configs";
import { STATUS_CODE_CREATED } from "../constants";
import { useParams } from "react-router-dom";

function getEl(id) {
    return document.getElementById(id)
}


function createSocket(id) {
    var socket = io('http://localhost:8002', {
    cors: {
        origin: "*",
    },
    query: {
        id: id
    }
    });
    const editor = getEl("editor")
    editor.addEventListener("keyup", (evt)=>
    {
        const text = editor.value
        socket.emit('editor', {content:text, to: id})
    })
    socket.on('editor', (data) => {
        editor.value = data
    })
    return socket
}

function SessionPage() {
    const [codeField] = useState("")
    let {id} = useParams();

    useEffect(() => {
        var socket = createSocket(id)
        return ()=> {
            socket.emit('disconnected')}
    })

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
                        InputProps = {{readOnly: true}}
                        placeholder = "Chatbox here"
                        minRows={20}
                    >
                    </TextField >
                    <TextField 
                        id = "chatfield"
                        minRows={3}
                        maxRows={3}
                        multiline={true}
                        placeholder = "Enter here"
                        sx={{marginTop: "0.2em", marginBottom:"0.2em"}}
                    >
                    </TextField >
                    <Button 
                        id = "finish-button"
                        variant="contained"
                        style={{width: 100 }}
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
                        Question Here
                    </Typography>
					<TextField
                        id="editor"
                        minRows={25}
                        placeholder="Enter your code here"
                        multiline={true}
					>
					</TextField>
                </Box>
            </Box>
        </Box>
    )
}
export default SessionPage;
