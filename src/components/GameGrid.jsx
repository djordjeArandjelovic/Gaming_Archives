import { SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import useGames from "../hooks/useGames";
import CardSkeleton from "./CardSkeleton";
import GameCard from "./GameCard";

const GameGrid = ({ selectedGenre }) => {
	const { data, error, isLoading } = useGames(selectedGenre);

	const skeletons = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];

	return (
		<>
			{error && <Text color={"red.500"}>{error}</Text>}
			<SimpleGrid
				columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
				spacing={5}
				padding={"10px"}
			>
				{isLoading &&
					skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)}
				{data.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</SimpleGrid>
		</>
	);
};

export default GameGrid;
