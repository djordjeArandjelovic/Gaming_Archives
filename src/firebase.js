import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD81cC22Lq69xuZJfPw6_r4-yvWkUfbNQw",
	authDomain: "games-d8d74.firebaseapp.com",
	projectId: "games-d8d74",
	storageBucket: "games-d8d74.appspot.com",
	messagingSenderId: "26596025849",
	appId: "1:26596025849:web:6a0c3789ea27f7568dc928",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
