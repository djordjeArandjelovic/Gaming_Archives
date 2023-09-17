import React from "react";
import { BsSearch } from "react-icons/bs";
import {
	FormControl,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import bb8 from "../assets/bb8rolling.gif";

const SearchGames = () => {
	const gameRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<FormControl as={"form"} onSubmit={handleSubmit}>
			<InputGroup>
				<InputLeftElement children={<BsSearch />} />
				<Input
					ref={gameRef}
					borderRadius={20}
					fontFamily={"StarWars"}
					fontWeight={"light"}
					letterSpacing={"1px"}
					placeholder="Search games..."
					variant="filled"
				/>
			</InputGroup>
		</FormControl>
	);
};

export default SearchGames;
