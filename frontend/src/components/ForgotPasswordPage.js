import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link} from "react-router-dom";

function ForgotPasswordPage() {
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
            flexDirection="column" 
            backgroundColor="secondary.main" 
            width="50%" 
            alignItems="center" 
            >
                <Box
                alignSelf="flex-start"
                justifyItems="center">
                    <Button disableRipple
                    sx={{
                    "&:hover": {
                        backgroundColor: "#FFFFFF"
                    }}}>
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
                        Forgot Password
                    </Typography>

                    <TextField
                    label="Email Address"
                    fullWidth
                    size="small"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        Reset Password
                    </Button>
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

export default ForgotPasswordPage;
