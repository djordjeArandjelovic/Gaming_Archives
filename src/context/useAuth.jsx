import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [uid, setUid] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setUid(user?.uid);
			} else {
				setUser(null);
				setUid(null);
			}
			setIsLoading(false);
		});
		return () => {
			listen();
		};
	}, []);

	const register = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	};

	const logout = () => {
		navigate(0);
		return signOut(auth);
	};

	return (
		<AuthContext.Provider
			value={{
				register,
				login,
				logout,
				googleSignIn,
				user,
				uid,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
