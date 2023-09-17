import React from "react";
import { Box, Heading, HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/star.png";
import { Link } from "react-router-dom";
import SearchGames from "./SearchGames";
import LoginDrawer from "./LoginDrawer";
import ColorSwitchMode from "./ColorSwitchMode";
import HamburgerMenu from "./HamburgerMenu";
import { useAuth } from "../context/useAuth";
import NavBarProfile from "./NavBarProfile";
import bb8 from "../assets/bb8rolling.gif";

const NavBar = () => {
	const { user } = useAuth();
	return (
		<>
			{/* MAIN HSTACK */}
			<HStack
				justify={"space-between"}
				padding={{
					base: "0.2rem 0.5rem",
					md: "0.3rem 1rem",
					lg: "0.3rem 1rem",
					xl: "0.3rem 1rem",
				}}
			>
				<HStack>
					<Image
						borderRadius={13}
						src={logo}
						boxSize="45px"
						backgroundColor="purple.300"
						pointerEvents="none"
					/>
					{/* SEARCH GAMES */}
					<SearchGames />
				</HStack>
				<Show breakpoint="(min-width: 680px)">
					<HStack gap={10} width={"25%"}>
						<Link className="skyblue" to="/">
							<Text
								_hover={{ color: "#9F7AEA" }}
								fontFamily={"StarWars"}
								fontWeight={"light"}
							>
								Games
							</Text>
						</Link>
						<Link className="skyblue" to="/profile">
							<Text
								_hover={{ color: "#9F7AEA" }}
								fontFamily={"StarWars"}
								fontWeight={"light"}
							>
								Profile
							</Text>
						</Link>
					</HStack>
				</Show>
				<HStack gap={5}>
					<Show breakpoint="(min-width: 680px)">
						{/* LOGIN DRAWER */}
						<NavBarProfile />
						<LoginDrawer />
					</Show>
					{/*  COLOR SWITCH MODE */}
					<ColorSwitchMode />
				</HStack>
				<Show breakpoint="(max-width: 680px)">
					{/* HAMBURGER MENU */}
					<HamburgerMenu />
				</Show>
			</HStack>
			{/* HEADING */}
			<Heading
				className="heading"
				fontSize={"3xl"}
				textAlign="center"
				padding={"0.2rem "}
				fontFamily={"StarWars"}
				fontWeight="normal"
				letterSpacing={"1px"}
				color={"orange"}
				position={"relative"}
			>
				The Gaming Archives
				<Show above={"1050px"}>
					<Box
						width={"30%"}
						height={"30px"}
						position={"absolute"}
						borderRadius={10}
						left={"1rem"}
						top={"0.5rem"}
						background={"orange.400"}
					>
						<Image
							className="bb8"
							src={bb8}
							display={"inline"}
							height={"30px"}
							position={"absolute"}
							borderRadius={10}
							left={"0rem"}

							// top={"0.5rem"}
						/>
					</Box>
				</Show>
			</Heading>
		</>
	);
};

export default NavBar;
