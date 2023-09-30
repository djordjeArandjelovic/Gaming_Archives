import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }) => {
	const { colorMode } = useColorMode();
	const { data, error } = usePlatforms();

	console.log(selectedPlatform);

	if (error) return null;

	return (
		<Menu>
			<MenuButton
				fontFamily={"StarWars"}
				fontWeight={"light"}
				letterSpacing={"1px"}
				as={Button}
				rightIcon={<BsChevronDown />}
			>
				{selectedPlatform?.name.toLowerCase() || "Platforms"}
			</MenuButton>
			<MenuList closeOnSelect={true} bg={colorMode === "dark" ? "#151515" : ""}>
				<MenuItem
					onClick={() => onSelectPlatform(null)}
					bg={colorMode === "dark" ? "#151515" : ""}
				>
					All
				</MenuItem>
				{data.map((platform) => (
					<MenuItem
						onClick={() => onSelectPlatform(platform)}
						bg={colorMode === "dark" ? "#151515" : ""}
						key={platform.id}
					>
						{platform.name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default PlatformSelector;
