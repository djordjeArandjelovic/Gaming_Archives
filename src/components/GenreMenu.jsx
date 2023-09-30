import React from "react";
import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from "@chakra-ui/react";
import Genres from "./Genres";
import { ChevronDownIcon } from "@chakra-ui/icons";

const GenreMenu = ({ onSelectGenre, selectedGenre }) => {
	const { colorMode } = useColorMode();
	return (
		<Box marginLeft={3}>
			<Menu>
				<MenuButton
					fontFamily={"StarWars"}
					fontWeight={"light"}
					letterSpacing={"1px"}
					as={Button}
					rightIcon={<ChevronDownIcon />}
				>
					Genres
				</MenuButton>
				<MenuList bg={colorMode === "dark" ? "#151515" : ""}>
					<Genres selectedGenre={selectedGenre} onSelectGenre={onSelectGenre} />
				</MenuList>
			</Menu>
		</Box>
	);
};

export default GenreMenu;
