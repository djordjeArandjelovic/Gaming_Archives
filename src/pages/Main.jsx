import { Flex, Grid, GridItem, Show, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import Genres from "../components/Genres";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import GenreMenu from "../components/GenreMenu";
import ToggleView from "../components/ToggleView";
import MoreDetails from "../components/MoreDetails";

const Main = ({ wishList, setWishList }) => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [toggleView, setToggleView] = useState(true);
	const { colorMode } = useColorMode();
	// console.log(searchText);
	return (
		<Grid
			bg={colorMode === "dark" ? "#151515" : ""}
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
						wishList={wishList}
						setWishList={setWishList}
						selectedGenre={selectedGenre}
						onSelectGenre={(genre) => setSelectedGenre(genre)}
					/>
				</GridItem>
			</Show>

			{/* MAIN-GRID */}
			<GridItem area={"main"}>
				{/* ABOVE CARDS */}
				<Flex>
					<Show above="md">
						<ToggleView toggleView={toggleView} setToggleView={setToggleView} />
					</Show>
					<Show breakpoint="(max-width: 767px)">
						<MoreDetails
							toggleView={toggleView}
							setToggleView={setToggleView}
						/>
					</Show>
					<Show breakpoint="(max-width: 991px)">
						<GenreMenu
							selectedGenre={selectedGenre}
							onSelectGenre={(genre) => setSelectedGenre(genre)}
						/>
					</Show>
				</Flex>
				{/* CARDS */}
				<GameGrid
					searchText={searchText}
					selectedGenre={selectedGenre}
					onSelectGenre={(genre) => setSelectedGenre(genre)}
					toggleView={toggleView}
				/>
			</GridItem>
		</Grid>
	);
};

export default Main;
