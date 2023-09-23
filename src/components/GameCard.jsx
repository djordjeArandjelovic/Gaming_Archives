import React, { useEffect } from "react";
import { useState } from "react";
import {
	Card,
	CardBody,
	Heading,
	Image,
	HStack,
	Badge,
	Button,
	Text,
} from "@chakra-ui/react";
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
import { Icon } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useToast } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const GameCard = ({ game }) => {
	const toast = useToast();
	const [favourite, setFavourite] = useState(false);

	const croppedUrl = (url) => {
		const index = url?.indexOf("media/") + "media/".length;
		return url?.slice(0, index) + "crop/600/400/" + url?.slice(index);
	};

	const scoreColor = (score) => {
		let color = score > 75 ? "green" : score > 60 ? "yellow" : "red";
		return color;
	};

	// DB
	const favCollection = collection(db, "FavouriteGames");
	const [gameID, setGameID] = useState({
		id: "",
	});

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

	const favouriteGame = async (id) => {
		game.id === id && setFavourite(true);
		setGameID({
			id: game.id,
		});
		console.log(game.id);
		console.log(gameID, "GAMEID");

		if (!favourite) {
			toast({
				title: "Success.",
				description: `${game.name} added to your favourites.`,
				status: "success",
				duration: 2500,
				isClosable: false,
				position: "top-right",
			});
		} else {
			toast({
				title: "Success.",
				description: `${game.name} removed from your favourites.`,
				status: "success",
				duration: 2500,
				isClosable: false,
				position: "top-right",
			});
		}
	};

	return (
		<>
			<Card
				borderRadius={"10px"}
				overflow="hidden"
				margin={{ sm: "auto", md: "auto", lg: "0", xl: "0" }}
				_hover={{
					boxShadow: "3px 6px 10px rgba(255, 0, 255, 0.5)",
				}}
			>
				<Image src={croppedUrl(game?.background_image)} />
				{/* TODO: LOGGING THE WHOLE GAME OBJECT > SEND IT TO FIREBASE AND RENDER
				IN PROFILE  */}
				<Button onClick={() => console.log(game)}>
					<Icon as={favourite ? FaHeart : FaRegHeart} boxSize={"18px"} />
				</Button>
				<CardBody>
					<HStack marginBottom={4} justifyContent="space-between">
						<HStack>
							{game?.parent_platforms?.map((platform) => (
								<Icon
									key={platform?.platform.id}
									color="gray.500"
									as={icons[platform?.platform.slug]}
								/>
							))}
						</HStack>
						<Badge
							colorScheme={scoreColor(game?.metacritic)}
							fontSize="14px"
							paddingX={1.5}
							borderRadius={4}
						>
							{game?.metacritic}
						</Badge>
					</HStack>
					<Heading fontSize="xl">{game?.name}</Heading>
				</CardBody>
			</Card>
		</>
	);
};

export default GameCard;
