import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Image,
	List,
	ListItem,
	Show,
	Spinner,
	Text,
	useColorMode,
	Icon,
} from "@chakra-ui/react";

import useData from "../hooks/useData";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/useAuth";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import WishListOverview from "./WishListOverview";
import NavBarProfile from "./NavBarProfile";
import usePlatforms from "../hooks/usePlatforms";
import {
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaLinux,
	FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";

const Genres = ({
	onSelectGenre,
	selectedGenre,
	wishList,
	setWishList,
	onSelectPlatform,
}) => {
	const { data, isLoading, error } = useData("/genres");
	const { data: platformData } = usePlatforms();
	const [refresh, setRefresh] = useState(true);
	const [displayCount, setDisplayCount] = useState(3);
	const [displayCountPl, setDisplayCountPl] = useState(4);
	const { user } = useAuth();
	const { colorMode } = useColorMode();

	const icons = {
		pc: FaWindows,
		playstation: FaPlaystation,
		xbox: FaXbox,
		nintendo: SiNintendo,
		mac: FaApple,
		linux: FaLinux,
		ios: MdPhoneIphone,
		android: FaAndroid,
		web: BsGlobe,
	};

	const croppedUrl = (url) => {
		const index = url?.indexOf("media/") + "media/".length;
		return url?.slice(0, index) + "crop/600/400/" + url?.slice(index);
	};

	const handleRefresh = () => {
		onSelectGenre([]);
		onSelectPlatform(null);
		setDisplayCount(3);
		setDisplayCountPl(3);
		setRefresh(true);
	};

	const handleGenre = (genre) => {
		onSelectGenre(genre);
		setRefresh(false);
	};

	const handlePlatform = (platform) => {
		onSelectPlatform(platform);
		setRefresh(false);
	};

	const handleSeeMore = () => {
		setDisplayCount(data.length);
	};

	const handleSeeMorePlatforms = () => {
		setDisplayCountPl(platformData.length);
	};

	useEffect(() => {
		if (!user) {
			return;
		}

		const userFavGames = collection(db, "users", user?.uid, "favourites");
		const favQuery = query(userFavGames);

		getDocs(favQuery)
			.then((querySnapshot) => {
				const games = [];
				querySnapshot.forEach((doc) => {
					games.push(doc?.data());
				});
				setWishList(games);
			})
			.catch((err) =>
				console.log("error from useEffect Genres (querySnapshot)", err)
			);
	}, [user]);

	if (isLoading) return <Spinner />;
	if (error) return null;

	return (
		<>
			<Flex
				flexDirection={"column"}
				mt={{
					base: 5,
					md: "30%",
				}}
				ml={2}
			>
				<NavBarProfile />
			</Flex>

			<Heading
				color={refresh === true && colorMode === "dark" ? "#F7B263" : ""}
				fontSize={"xl"}
				paddingX={"10px"}
				mt={"10%"}
				width={"200px"}
			>
				<Link onClick={handleRefresh} to={"/"}>
					Home
				</Link>
			</Heading>

			<WishListOverview wishList={wishList} />

			<List paddingX={"10px"} mt={5} width={"200px"}>
				<Heading
					color={colorMode === "dark" ? "#F7B263" : ""}
					mb={2}
					fontSize={"xl"}
				>
					Genres
				</Heading>
				{data.slice(0, displayCount).map((genre) => (
					<ListItem key={genre?.id} paddingY={"5px"}>
						<HStack>
							<Image
								src={croppedUrl(genre?.image_background)}
								objectFit="cover"
								boxSize={"32px"}
								borderRadius={8}
							/>
							<Button
								variant="link"
								fontSize={"md"}
								value={genre?.name}
								fontWeight={genre?.id === selectedGenre?.id ? "bold" : "normal"}
								color={genre?.id === selectedGenre?.id ? "#F7B263" : ""}
								onClick={() => handleGenre(genre)}
							>
								{genre?.name}
							</Button>
						</HStack>
					</ListItem>
				))}
				{data.length > 3 && displayCount < data.length ? (
					<ListItem>
						<HStack>
							<Button
								children={<ChevronDownIcon />}
								size={"sm"}
								onClick={handleSeeMore}
							/>
							<Text>Show all</Text>
						</HStack>
					</ListItem>
				) : (
					<ListItem>
						<HStack>
							<Button
								children={<ChevronUpIcon />}
								size={"sm"}
								onClick={handleRefresh}
							/>
							<Text>Show less</Text>
						</HStack>
					</ListItem>
				)}
			</List>
			<List paddingX={"10px"} mt={5} width={"200px"}>
				<Heading
					color={colorMode === "dark" ? "#F7B263" : ""}
					mb={2}
					fontSize={"xl"}
				>
					Platoforms
				</Heading>
				{platformData.slice(0, displayCountPl).map((platform, index) =>
					index === 1 ? null : (
						<ListItem mb={1} key={platform?.id}>
							<HStack gap={3} align={"center"}>
								<Icon
									objectFit="cover"
									boxSize={"24px"}
									borderRadius={8}
									as={icons[platform?.slug]}
								/>
								<Flex align={"flex-start"}>
									<Button
										onClick={() => handlePlatform(platform)}
										variant="link"
										fontSize={"md"}
									>
										{platform?.name}
									</Button>
								</Flex>
							</HStack>
						</ListItem>
					)
				)}
				{platformData.length > 3 && displayCountPl < platformData.length ? (
					<ListItem>
						<HStack>
							<Button
								children={<ChevronDownIcon />}
								size={"sm"}
								onClick={handleSeeMorePlatforms}
							/>
							<Text>Show all</Text>
						</HStack>
					</ListItem>
				) : (
					<ListItem>
						<HStack>
							<Button
								children={<ChevronUpIcon />}
								size={"sm"}
								onClick={handleRefresh}
							/>
							<Text>Show less</Text>
						</HStack>
					</ListItem>
				)}
			</List>
			{/* <Show above="lg">
				<List paddingX={"10px"} mt={10} width={"200px"}>
					<Heading
						color={colorMode === "dark" ? "#F7B263" : ""}
						mb={2}
						fontSize={"xl"}
					>
						Platforms
					</Heading>
					{platformData.map((platform) => (
						<ListItem key={platform?.id} paddingY={"5px"}>
							<Button
								variant={"link"}
								value={platform?.name}
								fontWeight={
									platform?.id === selectedPlatform?.id ? "bold" : "normal"
								}
								color={platform?.id === selectedPlatform?.id ? "#F7B263" : ""}
								onClick={() => onSelectPlatform(platform)}
							>
								{platform?.name}
							</Button>
						</ListItem>
					))}
				</List>
			</Show> */}
		</>
	);
};

export default Genres;
