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

import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { useNavigate, useLocation } from "react-router-dom";
import { STATUS_CODE_SUCCESS } from "../constants";

function ResetPasswordPage() {
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		navigate("/signin");
	};

	const validateFields = () => {
		// Check password length
		if (password.length < 8) {
			setErrorMessage("Password has to be at least 8 characters long!");
			return false;
		}
		return true;
	};

	const handleResetPassword = async () => {
		if (validateFields()) {
			const res = await axios
				.put(
					URL_USER_SVC +
						"/resetpw" +
						"/" +
						location.pathname.split("/")[2],
					{ new: password }
				)
				.catch((err) => {
					console.log(err);
					setErrorMessage(err.response.data.message);
				});
			if (res && res.status === STATUS_CODE_SUCCESS) {
				handleOpen();
			}
		}
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
						Reset Password
					</Typography>

					<TextField
						label="New Password"
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
						onClick={handleResetPassword}
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
					Password has been reset
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
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default ResetPasswordPage;
