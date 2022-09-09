import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../constants";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

function HomePage() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [openChangePassword, setOpenChangePassword] = useState(false);
	const [changePwError, setChangePwError] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChangePasswordOpen = () => {
		setOpenChangePassword(true);
	};

	const handleChangePasswordCancel = () => {
		setOpenChangePassword(false);
	};

	const handleChangePasswordConfirm = async () => {
		const res = await axios
			.put(
				URL_USER_SVC + "/changepw" + "/" + location.state.email,
				{ old: oldPassword, new: newPassword },
				{ withCredentials: true, credentials: "include" }
			)
			.catch((err) => {
				console.log(err);
				setChangePwError(err.response.data.message);
			});

		if (res) {
			setOpenChangePassword(false);
		}
	};

	const handleLogout = async () => {
		const res = await axios
			.post(
				URL_USER_SVC + "/logout",
				{},
				{ withCredentials: true, credentials: "include" }
			)
			.catch((err) => {
				console.log(err);
			});

		if (res) {
			navigate("/signin");
		}
	};

	const handleDeleteAccount = async () => {
		const res = await axios
			.delete(
				URL_USER_SVC + "/deleteacc" + "/" + location.state.email,
				{ withCredentials: true, credentials: "include" }
			)
			.catch((err) => {
				console.log(err);
			});

		if (res) {
			navigate("/signin");
		}
	};

	return (
		<Box>
			<Dialog open={openChangePassword}>
				<DialogTitle
					sx={{
						fontWeight: "700",
						fontSize: "0.4em",
						fontFamily: "Poppins",
					}}
				>
					Change Password
				</DialogTitle>
				<DialogContent>
					<TextField
						label="Old Password"
						fullWidth
						size="small"
						variant="standard"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						sx={{ marginBottom: "0.15em" }}
						inputProps={{ style: { fontSize: "0.3em" } }}
						InputLabelProps={{ style: { fontSize: "0.3em" } }}
						type="password"
						autoFocus
					></TextField>

					<TextField
						label="New Password"
						fullWidth
						size="small"
						variant="standard"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						sx={{ marginBottom: "0.15em" }}
						inputProps={{ style: { fontSize: "0.3em" } }}
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
						{changePwError}
					</Typography>
					<DialogActions>
						<Button
							onClick={handleChangePasswordCancel}
							autoFocus
							variant="outlined"
							sx={{
								textTransform: "none",
								fontSize: "0.3em",
								fontFamily: "Poppins",
							}}
						>
							Cancel
						</Button>

						<Button
							onClick={handleChangePasswordConfirm}
							autoFocus
							variant="contained"
							sx={{
								textTransform: "none",
								fontSize: "0.3em",
								fontFamily: "Poppins",
							}}
						>
							Confirm
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography
						sx={{
							flexGrow: 1,
							fontFamily: "Lato",
							fontSize: "0.5em",
							fontWeight: "700",
							padding: "0",
							margin: "0",
							verticalAlign: "middle",
						}}
					>
						PeerPrep
					</Typography>
					<Box color="primary">
						<IconButton
							onClick={handleMenu}
							color="secondary"
							sx={{
								maxHeight: "0.5em",
								maxWidth: "0.5em",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<AccountCircle sx={{ fontSize: "0.5em" }} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem
								onClick={handleChangePasswordOpen}
								sx={{
									fontFamily: "Poppins",
									fontSize: "0.3em",
								}}
							>
								Change Password
							</MenuItem>
							<MenuItem
								onClick={handleLogout}
								sx={{
									fontFamily: "Poppins",
									fontSize: "0.3em",
								}}
							>
								Logout
							</MenuItem>
							<MenuItem
								onClick={handleDeleteAccount}
								sx={{
									fontFamily: "Poppins",
									fontSize: "0.3em",
								}}
							>
								Delete Account
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default HomePage;
