import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CreateAccountPage from "./components/CreateAccountPage";
import SignInPage from "./components/SignInPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import HomePage from "./components/HomePage";

const theme = createTheme({
	palette: {
		primary: {
			main: "#212121",
		},
		secondary: {
			main: "#FFFFFF",
		},
		error: {
			main: "#ff0000",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Router>
					<Routes>
						<Route
							exact
							path="/"
							element={<Navigate replace to="/signin" />}
						></Route>
						<Route path="/signin" element={<SignInPage />} />
						<Route path="/signup" element={<CreateAccountPage />} />
						<Route
							path="/forgotpassword"
							element={<ForgotPasswordPage />}
						/>
						<Route
							path="/resetpw/:token"
							element={<ResetPasswordPage />}
						/>
						<Route path="/home" element={<HomePage />} />
					</Routes>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
