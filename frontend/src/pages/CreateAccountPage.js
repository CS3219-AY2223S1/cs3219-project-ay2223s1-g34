import {
	Box,
	Button,
	TextField,
	Typography,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_CREATED } from "../constants";
import { useNavigate } from "react-router-dom";

function CreateAccountPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isAlertOpen, setAlertOpen] = useState(false);
	const navigate = useNavigate();

	const handleOpenAlert = () => {
		setAlertOpen(true);
	};
	const handleBack = async () => {
		navigate("/signin");
	};

	const handleSignup = async () => {
		const res = await axios
			.post(
				URL_USER_SVC + "/createacc",
				{ username, email, password },
				{ withCredentials: true, credentials: "include" }
			)
			.catch((err) => {
				setErrorMessage(err.response.data.message);
			});

		if (res && res.status === STATUS_CODE_CREATED) {
			handleOpenAlert();
		}
	};

	return (
		<Box display="flex" flexDirection="row" height="100vh">
			<Box
				display="flex"
				flexDirection="row"
				backgroundColor="secondary.main"
				width="50%"
				alignItems="center"
			>
				<Box alignSelf="flex-start" justifyItems="flex-start">
					<Button onClick={handleBack} disableRipple>
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
						Create Account
					</Typography>

					<TextField
						label="Username"
						fullWidth
						size="small"
						variant="standard"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						sx={{ marginBottom: "0.15em" }}
						InputProps={{ style: { fontSize: "0.3em" } }}
						InputLabelProps={{ style: { fontSize: "0.3em" } }}
						autoFocus
					></TextField>

					<TextField
						label="Email Address"
						fullWidth
						size="small"
						variant="standard"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						sx={{ marginBottom: "0.3em" }}
						InputProps={{ style: { fontSize: "0.3em" } }}
						InputLabelProps={{ style: { fontSize: "0.3em" } }}
						autoFocus
					></TextField>

					<TextField
						label="Password"
						fullWidth
						size="small"
						variant="standard"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						sx={{ marginBottom: "1em" }}
						InputProps={{ style: { fontSize: "0.3em" } }}
						InputLabelProps={{ style: { fontSize: "0.3em" } }}
						type="password"
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
						onClick={handleSignup}
						color="primary"
						size="large"
						variant={"contained"}
						sx={{
							fontFamily: "Poppins",
							fontSize: "0.25em",
							letterSpacing: "1.5px",
						}}
					>
						Sign Up
					</Button>

					<Typography
						fontSize="0.25em"
						fontFamily="Poppins"
						color="primary.main"
						marginTop="1em"
						align="center"
						sx={{ opacity: "70%" }}
					>
						Already have an account?
						<Button
							onClick={handleBack}
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
									fontWeight: "700",
								},
							}}
						>
							Sign in
						</Button>
					</Typography>
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
				>
					Some text or image about PeerPrep
				</Typography>
			</Box>

			<Dialog open={isAlertOpen}>
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
					What are you waiting for? Hurry up and sign in now!
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleBack}
						autoFocus
						sx={{
							textTransform: "none",
							fontSize: "0.3em",
							fontFamily: "Poppins",
						}}
					>
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default CreateAccountPage;
