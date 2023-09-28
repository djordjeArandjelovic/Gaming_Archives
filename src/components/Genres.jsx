import React, { useEffect, useState } from "react";
import {
	Button,
	Heading,
	HStack,
	Image,
	List,
	ListItem,
	Spinner,
	Text,
} from "@chakra-ui/react";

import logo from "../assets/logo.svg";
import useData from "../hooks/useData";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/useAuth";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Genres = ({ onSelectGenre, selectedGenre, wishList, setWishList }) => {
	const { data, isLoading, error } = useData("/genres");
	const [refresh, setRefresh] = useState(true);
	const [displayCount, setDisplayCount] = useState(3);
	const { user } = useAuth();

	const croppedUrl = (url) => {
		const index = url?.indexOf("media/") + "media/".length;
		return url?.slice(0, index) + "crop/600/400/" + url?.slice(index);
	};

	const handleRefresh = () => {
		onSelectGenre([]);
		setDisplayCount(3);
		setRefresh(true);
	};

	const handleGenre = (genre) => {
		onSelectGenre(genre);
		setRefresh(false);
	};

	const handleSeeMore = () => {
		setDisplayCount(data.length);
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
				console.log("error from useEffect Profile (querySnapshot)", err)
			);
	}, [user, wishList]);

	if (isLoading) return <Spinner />;
	if (error) return null;

	return (
		<>
			<Heading
				color={refresh === true ? "#F7B263" : ""}
				fontSize={"2xl"}
				paddingX={"10px"}
				mt={2}
				width={"200px"}
			>
				<Link onClick={handleRefresh} to={"/"}>
					Home
				</Link>
			</Heading>
			<List paddingX={"10px"} mt={10} width={"200px"}>
				<Heading mb={2} fontSize={"xl"}>
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
				{data.length > 5 && displayCount < data.length ? (
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
			<List paddingX={"10px"} mt={10} width={"200px"}>
				<Heading fontSize={"xl"} mb={2} mt={2}>
					Currently in WishList:
				</Heading>
				{wishList?.map((game) => (
					<ListItem key={game?.id}>{game?.name}</ListItem>
				))}
			</List>
		</>
	);
};

export default Genres;
