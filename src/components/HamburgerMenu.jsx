import {
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	IconButton,
	Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import LoginDrawer from "./LoginDrawer";

const HamburgerMenu = () => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuList>
				<MenuItem>
					<Link to={"/"}>Games</Link>
				</MenuItem>
				<MenuItem>
					<Link to={"/profile"}>Profile</Link>
				</MenuItem>
				<MenuItem>
					<Link>
						Login
						{/* <LoginDrawer /> */}
					</Link>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default HamburgerMenu;
