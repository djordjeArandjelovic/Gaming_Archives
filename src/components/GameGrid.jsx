import React from "react";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import CardSkeleton from "./CardSkeleton";
import GameCard from "./GameCard";

const GameGrid = ({ selectedGenre, searchText, toggleView }) => {
	const { data, error, isLoading } = useGames(selectedGenre, searchText);
	const skeletons = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];

	return (
		<>
			{error && <Text color={"red.500"}>{error}</Text>}
			{toggleView ? (
				<SimpleGrid
					columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
					spacing={5}
					padding={"2%"}
				>
					{isLoading &&
						skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)}
					{data.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</SimpleGrid>
			) : (
				<Flex
					flexDirection={"column"}
					padding={toggleView === false ? "1%" : "10%"}
					gap={10}
					margin={"auto"}
					width={"55%"}
				>
					{isLoading &&
						skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)}
					{data.map((game) => (
						<GameCard toggleView={toggleView} key={game.id} game={game} />
					))}
				</Flex>
			)}
		</>
	);
};

export default GameGrid;
