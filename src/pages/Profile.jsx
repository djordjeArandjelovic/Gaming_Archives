import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CardSkeleton from "../components/CardSkeleton";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";
import { doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

const Profile = () => {
	const { user } = useAuth();
	const [reFetch, setReFetch] = useState(false);
	const [currentUserData, setCurrentUserData] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

	const [newUser, setNewUser] = useState({
		email: user?.email || "",
		firstName: "",
		lastName: "",
	});

	// const userCollectionID = user.uid;
	// useEffect(() => {
	// 	const getUser = async () => {
	// 		const data = await getDocs(collection(db, user.uid));
	// 		const res = data.docs?.map((doc) => ({
	// 			...doc?.data(),
	// 			id: doc?.id,
	// 		}));
	// 		setCurrentUserData(res);
	// 	};
	// 	getUser();
	// }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user.uid);

		await addDoc(collection(db, user.uid), newUser);
		setReFetch(!reFetch);
	};

	if (!user) {
		return (
			<>
				<NavBar />
				<Heading
					textAlign={"center"}
					fontSize={"2xl"}
					fontFamily={"StarWars"}
					letterSpacing={"1px"}
					fontWeight={"light"}
					mt={10}
				>
					Please log in/sign up to have access to this page.
				</Heading>
			</>
		);
	}

	return (
		<>
			<NavBar />
			<Flex
				px={5}
				justify={"space-between"}
				flexDirection={{
					base: "column",
					md: "column",
					lg: "row",
					xl: "row",
				}}
			>
				<Box mt={2}>
					<Flex flexDirection={"column"} gap={5} padding="10px">
						<Heading
							fontFamily={"StarWars"}
							fontWeight={"light"}
							letterSpacing={"1px"}
						>
							user Profile:
						</Heading>
						<Button
							size={"sm"}
							width={"40%"}
							colorScheme={"orange"}
							fontSize={"md"}
							fontWeight={"bold"}
							onClick={onOpen}
						>
							{/* <Link to="/edit">Edit profile</Link> */}
							Edit Profile
						</Button>
						<Text fontSize={"lg"}>First Name:{newUser?.firstName}</Text>
						<Text fontSize={"lg"}>Last Name:{newUser?.lastName}</Text>
						<Text fontSize={"lg"}> email: {user?.email} </Text>
					</Flex>
				</Box>
				<Box mt={2}>
					<Heading
						mt={2.5}
						fontFamily={"StarWars"}
						fontWeight={"light"}
						letterSpacing={"1px"}
					>
						Favourite games:
					</Heading>
					<SimpleGrid
						columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
						spacing={{
							base: 5,
							md: 10,
							lg: 5,
							xl: 5,
						}}
						paddingX={{
							base: "2rem",
							md: "10px",
							lg: "10px",
							xl: "10px",
						}}
						marginTop={5}
					>
						{skeletons.map((skeleton) => (
							<CardSkeleton key={skeleton} />
						))}
					</SimpleGrid>
				</Box>
			</Flex>

			<Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={"center"}>Edit Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit}>
							<Flex direction={"column"} gap={2} mt={8}>
								<FormControl id="firstName">
									<FormLabel>First Name</FormLabel>
									<Input
										value={newUser.firstName}
										onChange={(e) =>
											setNewUser({ ...newUser, firstName: e.target.value })
										}
										type={"text"}
										placeholder="First Name"
									/>
								</FormControl>
								<FormControl id="lastName">
									<FormLabel>Last Name</FormLabel>
									<Input
										value={newUser.lastName}
										onChange={(e) =>
											setNewUser({ ...newUser, lastName: e.target.value })
										}
										type={"text"}
										placeholder="Last Name"
									/>
								</FormControl>
							</Flex>
							<Flex justify={"center"} align={"center"}>
								<Button type="submit" size={"sm"} mt={4} display={"block"}>
									Save Changes
								</Button>
							</Flex>
						</form>
					</ModalBody>

					{/* <ModalFooter>
						<Button
							colorScheme="red"
							mr={3}
							// onClick={handleDelete}
							margin={"auto"}
						>
							Delete
						</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
		</>
	);
};

export default Profile;
