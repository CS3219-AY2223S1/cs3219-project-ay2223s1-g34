import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CreateAccountPage from "./pages/CreateAccountPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import WaitingPage from "./pages/WaitingPage";
import SessionPage from "./pages/SessionPage";
import ProtectedRoute from "./components/user/ProtectedRoute";
import VerifyEmailPage from "./pages/VerifyEmailPage";

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
						<Route
							path="/verify/:token"
							element={<VerifyEmailPage />}
						/>


						<Route
							path="/home"
							element={
								<ProtectedRoute>
									<HomePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/waiting"
							element={
								<ProtectedRoute>
									<WaitingPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/session"
							element={
								<SessionPage />

							}
						/>
					</Routes>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
