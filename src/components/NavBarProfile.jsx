import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const NavBarProfile = () => {
	const { user } = useAuth();
	if (user) {
		return (
			<Link to={"/profile"}>
				<Avatar size={"sm"} name={user?.displayName || user?.email} />
			</Link>
		);
	}
};

export default NavBarProfile;
