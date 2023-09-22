import { Grid, GridItem, Show } from "@chakra-ui/react";
import React, { useState } from "react";
import Genres from "../components/Genres";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import GenreMenu from "../components/GenreMenu";

const Main = () => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [searchText, setSearchText] = useState("");
	// console.log(searchText);
	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`,
				lg: `"nav nav" "aside main"`,
			}}
		>
			{/* NAVBAR */}
			<GridItem area={"nav"} mb={5}>
				<NavBar
					onSearch={(searchText) => {
						console.log(searchText);
						setSearchText(searchText);
					}}
				/>
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
					searchText={searchText}
					selectedGenre={selectedGenre}
					onSelectGenre={(genre) => setSelectedGenre(genre)}
				/>
			</GridItem>
		</Grid>
	);
};

export default Main;
