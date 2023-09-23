import React, { useState } from "react";
import { Box, Button, Flex, Show, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import CardSkeleton from "./CardSkeleton";
import GameCard from "./GameCard";
import { BsGrid, BsViewList } from "react-icons/bs";
import GenreMenu from "./GenreMenu";

const GameGrid = ({ selectedGenre, searchText, toggleView }) => {
	const { data, error, isLoading } = useGames(selectedGenre, searchText);
	// const [toggleView, setToggleView] = useState(true);
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
					padding={"10px"}
				>
					{isLoading &&
						skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)}
					{data.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</SimpleGrid>
			) : (
				<Flex flexDirection={"column"} padding={"10%"} gap={10}>
					{isLoading &&
						skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)}
					{data.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</Flex>
			)}
		</>
	);
};

export default GameGrid;
