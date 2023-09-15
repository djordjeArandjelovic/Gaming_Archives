import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/useAuth";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
