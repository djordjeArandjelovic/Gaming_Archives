import React from "react";
import { BsSearch } from "react-icons/bs";
import {
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { useRef } from "react";

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
