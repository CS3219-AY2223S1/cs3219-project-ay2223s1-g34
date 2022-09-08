import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CreateAccountPage from './components/CreateAccountPage';
import SignInPage from './components/SignInPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#212121'
            },
        secondary: {
            main: '#FFFFFF'
        },
        error: {
            main: '#ff0000'
        }
    }
  });

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<CreateAccountPage/>}/>
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
