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
	Box,
	Img,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
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
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/useAuth";

const GameCard = ({ game, toggleView }) => {
	const { user } = useAuth();
	const toast = useToast();
	const [favourite, setFavourite] = useState(false);

	// SCREENSHOT GALLERY
	const [isOpen, setIsOpen] = useState(false);
	const [selectedScreenshot, setSelectedScreenshot] = useState(null);

	// BETTER QUALITY PICTURE
	const croppedUrl = (url) => {
		const index = url?.indexOf("media/") + "media/".length;
		return url?.slice(0, index) + "crop/600/400/" + url?.slice(index);
	};

	// COLOR FOR BADGE
	const scoreColor = (score) => {
		let color = score > 75 ? "green" : score > 60 ? "yellow" : "red";
		return color;
	};

	// PLATFORM ICONS

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

	// SCREENSHOT MODAL

	const onOpen = (screenshot) => {
		setSelectedScreenshot(screenshot);
		setIsOpen(true);
	};
	const onClose = () => {
		setIsOpen(false);
	};

	const filteredScreenshots = game?.short_screenshots.slice(1);

	// DB;
	const usersCollection = collection(db, "users");

	const addGame = async (gameData) => {
		try {
			const userUIDDoc = doc(usersCollection, user?.uid);
			const userFavGames = collection(userUIDDoc, "favourites");

			await addDoc(userFavGames, gameData);
			toast({
				title: "Success.",
				description: `${game.name} added to your favourites.`,
				status: "success",
				duration: 2500,
				isClosable: false,
				position: "top-right",
			});
		} catch (error) {
			console.log(error, "error from addGame");
		}
	};

	const handleSave = () => {
		if (!user) {
			toast({
				title: "Error.",
				description: "Please log in.",
				status: "error",
				duration: 2500,
				isClosable: false,
				position: "top",
			});
			setFavourite(true);
		} else {
			addGame(game);
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
				<Image
					src={
						toggleView === false
							? game?.background_image
							: croppedUrl(game?.background_image)
					}
				/>

				<Button onClick={handleSave}>
					<Icon as={favourite ? FaHeart : FaRegHeart} boxSize={"18px"} />
				</Button>
				<CardBody>
					<HStack marginBottom={4} justifyContent="space-between">
						<HStack>
							{toggleView === false ? <Text>Platforms:</Text> : null}
							{game?.parent_platforms?.map((platform) => (
								<Icon
									key={platform?.platform.id}
									color="gray.500"
									as={icons[platform?.platform.slug]}
								/>
							))}
						</HStack>
						<HStack>
							{toggleView === false ? <Text>Score:</Text> : null}
							<Badge
								colorScheme={scoreColor(game?.metacritic)}
								fontSize={toggleView === false ? "24px" : "14px"}
								paddingX={1.5}
								borderRadius={4}
							>
								{game?.metacritic}
							</Badge>
						</HStack>
					</HStack>
					<Heading
						fontSize={toggleView === false ? "3xl" : "xl"}
						textAlign={toggleView === false ? "center" : "left"}
					>
						{game?.name}
					</Heading>
					{toggleView === false ? (
						<>
							<Text mt={2} fontSize={"sm"}>
								Release date: {game?.released}
							</Text>
							<Text fontSize={"xl"}>Screenshots:</Text>
							<Box
								display={"grid"}
								gridTemplateColumns={"repeat(2, 1fr)"}
								gap={2}
							>
								{filteredScreenshots.map((screenshot) => (
									<Box key={screenshot.id}>
										<Img
											margin={"auto"}
											src={screenshot.image}
											transition={"0.5s"}
											_hover={{
												transform: "scale(1.05)",
											}}
											cursor={"zoom-in"}
											onClick={() => onOpen(screenshot)}
										/>
									</Box>
								))}
								<Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
									<ModalOverlay />
									<ModalContent>
										<ModalHeader>{game?.name}</ModalHeader>
										<ModalCloseButton />
										<ModalBody>
											{selectedScreenshot && (
												<Image src={selectedScreenshot.image} />
											)}
										</ModalBody>
									</ModalContent>
								</Modal>
							</Box>
						</>
					) : null}
				</CardBody>
			</Card>
		</>
	);
};

export default GameCard;
