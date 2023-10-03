import {
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	IconButton,
	Button,
	useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const HamburgerMenu = () => {
	const { user, logout } = useAuth();
	const { colorMode } = useColorMode();
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuList bg={colorMode === "dark" ? "#151515" : ""}>
				<MenuItem
					_hover={{
						bg: "#282828",
					}}
					bg={colorMode === "dark" ? "#151515" : ""}
				>
					<Link to={"/"}>Games</Link>
				</MenuItem>
				<MenuItem
					_hover={{
						bg: "#282828",
					}}
					bg={colorMode === "dark" ? "#151515" : ""}
				>
					<Link to={"/profile"}>Profile</Link>
				</MenuItem>
				<MenuItem
					_hover={{
						bg: "#282828",
					}}
					bg={colorMode === "dark" ? "#151515" : ""}
				>
					{!user ? (
						<Link to={"/login"}>LogIn</Link>
					) : (
						<Link as={"button"} onClick={logout} to={"/"}>
							LogOut
						</Link>
					)}
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default HamburgerMenu;
