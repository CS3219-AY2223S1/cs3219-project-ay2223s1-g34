import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_SUCCESS } from "../constants";
import { useNavigate } from "react-router-dom";

function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSignin = async () => {
		const res = await axios
			.post(
				URL_USER_SVC + "/signin",
				{ email, password },
				{ withCredentials: true, credentials: "include" }
			)
			.catch((err) => {
				setErrorMessage(err.response.data.message);
			});

		if (res && res.status === STATUS_CODE_SUCCESS) {
			navigate("/home", { state: { email } });
		}
	};

	const handleForgotPassword = async () => {
		navigate("/forgotpassword");
	};

	const handleCreateAccount = async () => {
		navigate("/signup");
	};

	return (
		<Box display="flex" flexDirection="row" height="100vh">
			<Box
				display="flex"
				flexDirection="column"
				backgroundColor="primary.main"
				width="50%"
				alignItems="center"
				justifyContent="center"
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
					Some text or image about PeerPrep
				</Typography>
			</Box>

			<Box
				display="flex"
				flexDirection="row"
				backgroundColor="secondary.main"
				width="50%"
				justifyContent="center"
			>
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
						Welcome!
					</Typography>

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
						sx={{ marginBottom: "0.15em" }}
						InputProps={{ style: { fontSize: "0.3em" } }}
						InputLabelProps={{ style: { fontSize: "0.3em" } }}
						type="password"
						autoFocus
					></TextField>

					<Box
						display="flex"
						flexDirection="row"
						justifyContent="flex-end"
						marginBottom="0.5em"
					>
						<Button
							onClick={handleForgotPassword}
							color="primary"
							size="small"
							sx={{
								fontFamily: "Poppins",
								fontSize: "0.25em",
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
							Forgot password?
						</Button>
					</Box>

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
						onClick={handleSignin}
						color="primary"
						size="large"
						variant={"contained"}
						sx={{
							fontFamily: "Poppins",
							fontSize: "0.25em",
							letterSpacing: "1.5px",
						}}
					>
						Sign In
					</Button>

					<Typography
						fontSize="0.25em"
						fontFamily="Poppins"
						color="primary.main"
						marginTop="1em"
						align="center"
						sx={{ opacity: "70%" }}
					>
						New to PeerPrep?
						<Button
							onClick={handleCreateAccount}
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
							Create account
						</Button>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default SignInPage;
