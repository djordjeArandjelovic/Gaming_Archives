import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase";

const EditProfile = () => {
	const { user } = useAuth();

	// DB
	const usersCollection = collection(db, "users");
	const [users, setUsers] = useState([]);
	const [newEmail, setNewEmail] = useState("");
	const [newUser, setNewUser] = useState({
		email: "",
		firstName: "",
		lastName: "",
	});
	// useEffect(() => {
	// 	setNewEmail(user?.email);
	// }, []);
	// console.log(newEmail);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(newUser, "submit");

		await addDoc(usersCollection, newUser);
		setNewUser({
			email: "",
			firstName: "",
			lastName: "",
		});
	};

	return (
		<>
			<NavBar />
			<Container maxW={"60%"} margin={"auto"}>
				<Heading mb={5} mt={5} textAlign={"center"} size={"md"}>
					Edit profile for: {user?.email}
				</Heading>
				<FormControl as={"form"} onSubmit={handleSubmit}>
					<FormLabel>First Name:</FormLabel>
					<Input
						value={newUser.name}
						onChange={(e) =>
							setNewUser({ ...newUser, firstName: e.target.value })
						}
						mb={2}
					></Input>
					<FormLabel>Last Name:</FormLabel>
					<Input
						value={newUser.lastName}
						onChange={(e) =>
							setNewUser({ ...newUser, lastName: e.target.value })
						}
						mb={5}
					></Input>
					{/* <FormLabel>Email:</FormLabel>
					<Input
						value={user?.email}
						onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
						mb={5}
					></Input> */}
					<Button type="submit" size={"md"} colorScheme={"green"} mb={5}>
						Submit changes
					</Button>
				</FormControl>
			</Container>
		</>
	);
};

export default EditProfile;
