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
import useData from "../hooks/useData";
import { BsChevronDown } from "react-icons/bs";

const GenreMenu = ({ onSelectGenre, selectedGenre }) => {
	const { colorMode } = useColorMode();
	const { data } = useData("/genres");
	return (
		<Menu isLazy>
			<MenuButton
				ml={2}
				letterSpacing={"1px"}
				as={Button}
				rightIcon={<BsChevronDown />}
			>
				{selectedGenre?.name || "Genres"}
			</MenuButton>
			<MenuList closeOnSelect={true}>
				<MenuItem onClick={() => onSelectGenre(null)}>All</MenuItem>
				{data.map((genre, index) =>
					index === 1 ? null : (
						<MenuItem
							onClick={() => onSelectGenre(genre)}
							_hover={{
								bg: "#282828",
							}}
							key={genre.id}
						>
							{genre.name}
						</MenuItem>
					)
				)}
			</MenuList>
		</Menu>
	);
};

export default GenreMenu;
