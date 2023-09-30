import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CardSkeleton from "../components/CardSkeleton";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";
import {
	doc,
	setDoc,
	collection,
	addDoc,
	getDocs,
	query,
	getDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";

const Profile = ({ wishList, setWishList }) => {
	const { user } = useAuth();
	const [reFetch, setReFetch] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const toast = useToast();

	// useEffect(() => {
	// 	if (!user) {
	// 		return;
	// 	}
	// 	const userFavGames = collection(db, "users", user?.uid, "favourites");
	// 	const favQuery = query(userFavGames);

	// 	getDocs(favQuery)
	// 		.then((querySnapshot) => {
	// 			const games = [];
	// 			querySnapshot.forEach((doc) => {
	// 				games.push(doc?.data());
	// 			});
	// 			setWishList(games);
	// 		})
	// 		.catch((err) =>
	// 			console.log("error from useEffect Profile (querySnapshot)", err)
	// 		);
	// }, [user, wishList]);

	const removeGame = async (id) => {
		try {
			if (!user) {
				return;
			} else {
				const userFavGames = collection(db, "users", user?.uid, "favourites");
				const gameDocRef = doc(userFavGames, id);
				await deleteDoc(gameDocRef);
				toast({
					title: "Success.",
					description: `Game successfully removed from watchlist.`,
					status: "success",
					duration: 2500,
					position: "top",
					isClosable: true,
				});
				const filteredWL = wishList.filter((game) => game.id !== id);
				setWishList(filteredWL);
				// navigate(0);
			}
		} catch (error) {
			console.log("error from removeGame()", error);
		}
	};

	if (!user) {
		return (
			<>
				<NavBar />
				<Flex
					// height={"86vh"}
					bg={colorMode === "dark" ? "#151515" : ""}
					justify={"center"}
				>
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
				</Flex>
			</>
		);
	}

	return (
		<>
			<Box height={"100vh"} width={"100%"}>
				<NavBar />
				<Flex
					bg={colorMode === "dark" ? "#151515" : ""}
					px={5}
					gap={2}
					// justify={"space-between"}
					flexDirection={{
						base: "column",
						md: "column",
						lg: "row",
						xl: "row",
					}}
				>
					<Box borderRight={"1px solid rgb(247, 178, 99)"} mt={2}>
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
								Edit Profile
							</Button>
							{/* <Text fontSize={"lg"}>First Name:{newUser?.firstName}</Text>
							<Text fontSize={"lg"}>Last Name:{newUser?.lastName}</Text> */}
							<Text fontSize={"lg"}> email: {user?.email} </Text>
							<Heading>Wishlist</Heading>
							<List>
								{wishList.map((game) => (
									<ListItem key={game?.id}>{game?.name}</ListItem>
								))}
							</List>
						</Flex>
					</Box>
					<Box bg={colorMode === "dark" ? "#151515" : ""} mt={2}>
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
							{wishList?.map((game) => {
								return (
									<Container key={game?.id} position={"relative"}>
										<GameCard game={game} />

										<Button
											variant={"solid"}
											borderTopRightRadius={"0"}
											borderBottomLeftRadius={"0"}
											background={"gray.400"}
											color={"red.600"}
											letterSpacing={"1px"}
											size={"xs"}
											position={"absolute"}
											top={0}
											onClick={() => removeGame(game?.id?.toString())}
										>
											Remove
										</Button>
									</Container>
								);
							})}
						</SimpleGrid>
					</Box>
				</Flex>

				{/* <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent bg={colorMode === "dark" ? "#151515" : ""}>
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
					</ModalContent>
				</Modal> */}
			</Box>
		</>
	);
};

export default Profile;
