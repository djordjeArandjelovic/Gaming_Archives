import { Flex, Grid, GridItem, Show, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import Genres from "../components/Genres";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import GenreMenu from "../components/GenreMenu";
import ToggleView from "../components/ToggleView";
import MoreDetails from "../components/MoreDetails";
import PlatformSelector from "../components/PlatformSelector";

const Main = ({ wishList, setWishList }) => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [selectedPlatform, setSelectedPlatform] = useState(null);
	const [toggleView, setToggleView] = useState(true);
	const { colorMode } = useColorMode();

	// DB

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
						onSelectPlatform={(platform) => setSelectedPlatform(platform)}
						selectedPlatform={selectedPlatform}
					/>
				</GridItem>
			</Show>

			{/* MAIN-GRID */}
			<GridItem area={"main"}>
				{/* ABOVE CARDS */}
				{/* TODO: FIX SMALLEST SCREEN FLEX */}
				<Flex ml={4} align={"center"}>
					<Show above="md">
						<ToggleView toggleView={toggleView} setToggleView={setToggleView} />
					</Show>
					{/* <PlatformSelector
						onSelectPlatform={(platform) => setSelectedPlatform(platform)}
						selectedPlatform={selectedPlatform}
					/> */}
					{/* <Show breakpoint="(max-width: 991px)">
						<GenreMenu
							selectedGenre={selectedGenre}
							onSelectGenre={(genre) => setSelectedGenre(genre)}
						/>
					</Show> */}
					{/* <Show breakpoint="(max-width: 767px)">
						<MoreDetails
							toggleView={toggleView}
							setToggleView={setToggleView}
						/>
					</Show> */}
				</Flex>
				{/* CARDS */}
				<GameGrid
					selectedPlatform={selectedPlatform}
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
