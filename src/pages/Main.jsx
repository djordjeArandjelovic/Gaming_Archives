import { Grid, GridItem, Show, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Genres from "../components/Genres";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import GenreMenu from "../components/GenreMenu";
import AnimationBB8 from "../components/AnimationBB8";

const Main = () => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`,
				lg: `"nav nav" "aside main"`,
			}}
		>
			{/* NAVBAR */}
			<GridItem area={"nav"} mb={5}>
				<NavBar />
			</GridItem>
			{/* ASIDE */}
			<Show above="lg">
				<GridItem area={"aside"}>
					<Genres
						selectedGenre={selectedGenre}
						onSelectGenre={(genre) => setSelectedGenre(genre)}
					/>
				</GridItem>
			</Show>
			{/* MAIN-GRID */}
			<GridItem area={"main"}>
				<Show breakpoint="(max-width: 991px)">
					<GenreMenu
						selectedGenre={selectedGenre}
						onSelectGenre={(genre) => setSelectedGenre(genre)}
					/>
				</Show>
				<GameGrid
					selectedGenre={selectedGenre}
					onSelectGenre={(genre) => setSelectedGenre(genre)}
				/>
			</GridItem>
		</Grid>
	);
};

export default Main;
