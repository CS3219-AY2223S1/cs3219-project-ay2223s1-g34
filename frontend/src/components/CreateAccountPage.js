import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link} from "react-router-dom";

function CreateAccountPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const handleSignup = async () => {
        setIsSignupSuccess(false)
        const res = await axios.post(URL_USER_SVC, { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    setErrorDialog('This username already exists')
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_CREATED) {
            setSuccessDialog('Account successfully created')
            setIsSignupSuccess(true)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Box display="flex" flexDirection="row" height="100vh">
            <Box 
            display="flex" 
            flexDirection="row" 
            backgroundColor="secondary.main" 
            width="50%" 
            alignItems="center" 
            >
                <Box
                    alignSelf="flex-start"
                    justifyItems="flex-start">
                        <Button disableRipple>
                            <ArrowBackIcon sx={{ fontSize: "0.75em"}}></ArrowBackIcon>
                        </Button>
                </Box>
                <Box 
                display="flex" 
                flexDirection="column" 
                width="70%" 
                height="80%"
                justifyContent="center">
                    <Typography 
                    fontWeight="700" 
                    fontSize="0.8em" 
                    fontFamily="Lato" 
                    color="primary.main"
                    marginBottom="1.5em">
                        Create Account
                    </Typography>

                    <TextField
                    label="Username"
                    fullWidth
                    size="small"
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{marginBottom: "0.15em"}}
                    inputProps={{style: {fontSize: "0.3em"}}} 
                    InputLabelProps={{style: {fontSize: "0.3em"}}} 
                    autoFocus>
                    </TextField>

                    <TextField
                    label="Email Address"
                    fullWidth
                    size="small"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{marginBottom: "0.3em"}}
                    inputProps={{style: {fontSize: "0.3em"}}} 
                    InputLabelProps={{style: {fontSize: "0.3em"}}} 
                    autoFocus>
                    </TextField>

                    <TextField
                    label="Password"
                    fullWidth
                    size="small"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{marginBottom: "1em"}}
                    inputProps={{style: {fontSize: "0.3em"}}} 
                    InputLabelProps={{style: {fontSize: "0.3em"}}} 
                    autoFocus>
                    </TextField>

                    <Typography 
                    fontSize="0.25em" 
                    fontFamily="Poppins" 
                    color="error.main" 
                    align="center"
                    marginBottom="1em"
                    display= "none">
                        Some Error Message
                    </Typography>

                    <Button 
                    onClick={handleSignup} 
                    color="primary"
                    size="large"
                    variant={"contained"}
                    sx={{fontFamily: "Poppins", fontSize: "0.25em", letterSpacing: "1.5px"}}>
                    Sign Up
                    </Button>

                    <Typography 
                    fontSize="0.25em" 
                    fontFamily="Poppins" 
                    color="primary.main" 
                    marginTop="1em"
                    align="center"
                    sx ={{opacity: "70%"}}>
                        Already have an account?
                        <Button 
                            onClick={handleSignup} 
                            color="primary"
                            size="small"
                            sx={{
                                minWidth: "0",
                                padding: "0 0.5 0.5 0",
                                textDecoration: "underline", 
                                fontFamily: "Poppins", 
                                fontSize: "1em", 
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#FFFFFF",
                                    textDecoration: "underline",
                                    opacity: "100%",
                                    fontWeight: "700"
                                }}}>
                                Sign in
                        </Button>
                    </Typography>

                </Box>
            </Box>

            <Box 
            display="flex" 
            flexDirection="row" 
            backgroundColor="primary.main" 
            width="50%" 
            justifyContent="center"
            alignItems="center">
                <Typography 
                fontWeight="700" 
                fontSize="0.9em" 
                fontFamily="Lato" 
                color="secondary.main" 
                align="center" 
                width="60%">
                    PeerPrep
                    <Typography 
                    display="block" 
                    fontSize="0.5em" 
                    fontFamily="Poppins" 
                    color="secondary.main" 
                    align="center" 
                    marginTop="1em">
                        Some text or image about PeerPrep
                    </Typography>
                </Typography>
            </Box>
        </Box>
    )
}

export default CreateAccountPage;
