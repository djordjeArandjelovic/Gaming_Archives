import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/useAuth";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import GameDetailsPage from "./pages/GameDetailsPage";
import ErrorPage from "./pages/404/ErrorPage";

function App() {
	const [wishList, setWishList] = useState([]);

	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={<Main wishList={wishList} setWishList={setWishList} />}
						/>
						<Route
							path="/profile"
							element={
								<Profile wishList={wishList} setWishList={setWishList} />
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/games/:id" element={<GameDetailsPage />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
