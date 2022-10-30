import {
	Box,
	Button,
	TextField,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadAnim from "../components/user/LoadAnim";

import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { useNavigate } from "react-router-dom";
import { STATUS_CODE_SUCCESS } from "../constants";

function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setLoadingOpen] = useState(false);

	const navigate = useNavigate();

	const handleBack = async () => {
		navigate("/signin");
	};

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		navigate("/signin");
	};

	const handleForgotPassword = async () => {
		setLoadingOpen(true);
		const res = await axios
			.post(URL_USER_SVC + "/forgotpw" + "/" + email)
			.catch((err) => {
				console.log(err);
				setErrorMessage(err.response.data.message);
			});

		if (res && res.status === STATUS_CODE_SUCCESS) {
			handleOpen();
		}

		setLoadingOpen(false);
	};

	return (
		<Box display="flex" flexDirection="row" height="100vh">
			<Box
				display="flex"
				flexDirection="column"
				backgroundColor="secondary.main"
				width="50%"
				alignItems="center"
			>
				<Box alignSelf="flex-start" justifyItems="center">
					<Button disableRipple onClick={handleBack}>
						<ArrowBackIcon
							sx={{ fontSize: "0.75em" }}
						></ArrowBackIcon>
					</Button>
				</Box>

				<Box
					display="flex"
					flexDirection="column"
					width="70%"
					height="80%"
					justifyContent="center"
				>
					<Typography
						fontWeight="700"
						fontSize="0.8em"
						fontFamily="Lato"
						color="primary.main"
						marginBottom="1.5em"
					>
						Forgot Password
					</Typography>

					<TextField
						label="Email Address"
						fullWidth
						size="small"
						variant="standard"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						sx={{ marginBottom: "1em" }}
						InputProps={{ style: { fontSize: "0.3em" } }}
						InputLabelProps={{ style: { fontSize: "0.3em" } }}
						autoFocus
					></TextField>

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
						onClick={handleForgotPassword}
						color="primary"
						size="large"
						variant={"contained"}
						sx={{
							fontFamily: "Poppins",
							fontSize: "0.25em",
							letterSpacing: "1.5px",
						}}
					>
						Reset Password
					</Button>
				</Box>
			</Box>

			<Box
				display="flex"
				flexDirection="column"
				backgroundColor="primary.main"
				width="50%"
				justifyContent="center"
				alignItems="center"
			>
				<Typography
					fontWeight="700"
					fontSize="0.9em"
					fontFamily="Lato"
					color="secondary.main"
					align="center"
					width="60%"
				>
					PeerPrep
				</Typography>

				<Typography
					fontSize="0.5em"
					fontFamily="Poppins"
					color="secondary.main"
					align="center"
					marginTop="1em"
					width="60%"
				>
					Solve coding questions together
				</Typography>
			</Box>

			<Dialog open={isOpen}>
				<DialogTitle
					sx={{
						fontWeight: "700",
						fontSize: "0.4em",
						fontFamily: "Poppins",
					}}
				>
					Success!
				</DialogTitle>
				<DialogContent
					sx={{ fontSize: "0.3em", fontFamily: "Poppins" }}
				>
					An email has been sent to reset your password
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						autoFocus
						variant="contained"
						sx={{
							textTransform: "none",
							fontSize: "0.3em",
							fontFamily: "Poppins",
						}}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
			<LoadAnim open={isLoading} />
		</Box>
	);
}

export default ForgotPasswordPage;
