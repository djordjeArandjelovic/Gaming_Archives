import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";

const Profile = () => {
	const { user } = useAuth();
	return (
		<>
			<NavBar />
			<Flex p={5}>
				<Box>
					<Flex flexDirection={"column"} gap={4}>
						<Heading>User Profile:</Heading>
						<Heading fontSize={"lg"}> email: {user?.email} </Heading>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default Profile;
