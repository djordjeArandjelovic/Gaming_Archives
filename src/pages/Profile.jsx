import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import CardSkeleton from "../components/CardSkeleton";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";

const Profile = () => {
	const { user } = useAuth();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

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
						>
							<Link to="/edit">Edit profile</Link>
						</Button>
						<Text fontSize={"lg"}>Name:</Text>
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
		</>
	);
};

export default Profile;
