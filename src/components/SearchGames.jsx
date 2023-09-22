import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import {
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";

const SearchGames = ({ onSearch }) => {
	const gameRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (gameRef.current) onSearch(gameRef.current.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl>
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
		</form>
	);
};

export default SearchGames;
