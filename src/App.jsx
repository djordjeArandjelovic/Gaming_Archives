import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/useAuth";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import GameDetails from "./components/GameDetails";
import GameDetailsPage from "./pages/GameDetailsPage";

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
						<Route path="/edit" element={<EditProfile />} />
						<Route path="/games/:id" element={<GameDetailsPage />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
