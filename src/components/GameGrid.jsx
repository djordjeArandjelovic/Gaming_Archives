import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = ({ selectedGenre }) => {
	const { data, error, isLoading } = useGames(selectedGenre);

	return (
		<>
			<SimpleGrid
				columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
				spacing={5}
				padding={"10px"}
			>
				{data.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</SimpleGrid>
		</>
	);
};

export default GameGrid;
