import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }) => {
	const { colorMode } = useColorMode();
	const { data, error } = usePlatforms();

	if (error) return null;

	return (
		<Menu isLazy>
			<MenuButton
				letterSpacing={"1px"}
				as={Button}
				rightIcon={<BsChevronDown />}
			>
				{selectedPlatform?.name.toLowerCase() || "Platforms"}
			</MenuButton>
			<MenuList closeOnSelect={true}>
				<MenuItem onClick={() => onSelectPlatform(null)}>All</MenuItem>
				{data.map((platform, index) =>
					index === 1 ? null : (
						<MenuItem
							onClick={() => onSelectPlatform(platform)}
							_hover={{
								bg: "#282828",
							}}
							key={platform.id}
						>
							{platform.name}
						</MenuItem>
					)
				)}
			</MenuList>
		</Menu>
	);
};

export default PlatformSelector;
