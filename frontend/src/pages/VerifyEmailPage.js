import {
	Box,
	Button,
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

function VerifyEmailPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		navigate("/signin");
	};

	const handleVerifyEmail = async () => {
		const res = await axios
			.post(
				URL_USER_SVC + "/verify" + "/" + location.pathname.split("/")[2]
			)
			.catch((err) => {
				console.log(err);
				setErrorMessage(err.response.data.message);
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			handleOpen();
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
						Verify Email
					</Typography>

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
						onClick={handleVerifyEmail}
						color="primary"
						size="large"
						variant={"contained"}
						sx={{
							fontFamily: "Poppins",
							fontSize: "0.25em",
							letterSpacing: "1.5px",
						}}
					>
						Verify Email
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
					Some text or image about PeerPrep
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
					Email has been verified!
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
		</Box>
	);
}

export default VerifyEmailPage;
