import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import SessionPage from './components/SessionPage';
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                        //temporary way to have session id passed to session page
                        <Route path="/session/:id" element={<SessionPage/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
