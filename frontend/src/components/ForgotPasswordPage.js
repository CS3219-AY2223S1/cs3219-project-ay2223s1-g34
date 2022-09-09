import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link, Navigate, useNavigate} from "react-router-dom";

function ForgotPasswordPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleBack = async () => {
        navigate('/signin');
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
                    <Button 
                    disableRipple
                    onClick={handleBack}>
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
                    onClick={handleBack} 
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
