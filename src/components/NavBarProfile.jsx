import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const NavBarProfile = () => {
	const { user } = useAuth();
	const profileShow = user?.email.charAt(0).toUpperCase();
	if (user) {
		return (
			<Link to={"/profile"}>
				<Button
					className="btn-profile"
					rounded={"full"}
					size={"sm"}
					variant={"ghost"}
				>
					<Text fontSize={14}>{profileShow}</Text>
				</Button>
			</Link>
		);
	}
};

export default NavBarProfile;
