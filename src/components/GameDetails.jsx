import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import {
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Icon,
	Image,
	Spinner,
	Text,
} from "@chakra-ui/react";
import styled from "styled-components";
import {
	FaAndroid,
	FaApple,
	FaHeart,
	FaLinux,
	FaPlaystation,
	FaRegHeart,
	FaWindows,
	FaXbox,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";

// const filteredScreenshots = data?.short_screenshots.slice(1);

const GameDetails = ({ data, isLoading, wishlist }) => {
	const [fullText, setFullText] = useState(false);
	// console.log(data);

	const croppedUrl = (url) => {
		const index = url?.indexOf("media/") + "media/".length;
		return url?.slice(0, index) + "crop/600/400/" + url?.slice(index);
	};

	const limitText = () => {
		const words = data?.description_raw.split(" ");
		if (words?.length <= 150) return data?.description_raw;
		return words?.slice(0, 150).join(" ");
	};

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

	if (isLoading) {
		return (
			<Flex height={"100vh"} justify={"center"} align={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	return (
		<Wrapper>
			<Box className="content">
				<Box>
					<Image src={croppedUrl(data?.background_image)} borderRadius={10} />
					<Box mt={2}>
						<Text textAlign={"center"}>
							Read more about the game @
							<Badge>
								<a href={data?.website} target="_blank">
									{data?.website}
								</a>
							</Badge>
						</Text>
						<Button mt={5} width={"300px"}>
							Add to favourites
							<Icon ml={2} as={FaRegHeart} boxSize={"18px"} />
							{/* <Icon as={isInWL ? FaHeart : FaRegHeart} boxSize={"18px"} /> */}
						</Button>
					</Box>
				</Box>
				<Box className="desc" width={"50%"}>
					<Box
						margin={"auto"}
						width={"80%"}
						height={"20px"}
						display={"flex"}
						justifyContent={"space-between"}
						alignItems={"center"}
					>
						<Badge fontSize={"14px"}>{data?.released}</Badge>
						<HStack>
							{data?.parent_platforms?.map((platform) => (
								<Icon
									key={platform?.platform.id}
									color="white"
									as={icons[platform?.platform.slug]}
								/>
							))}
						</HStack>
						<Text letterSpacing={"1px"}>
							Avrage playtime: {data?.playtime} hours
						</Text>
					</Box>
					<Heading size={"4xl"} textAlign={"center"} py={5}>
						{data?.name}
					</Heading>

					<Text>
						{fullText ? data?.description_raw : limitText()}
						<Text
							color={"blue.200"}
							onClick={() => setFullText(!fullText)}
							as={"span"}
							cursor={"pointer"}
						>
							{fullText ? "...show less" : "...show more"}
						</Text>
					</Text>
				</Box>
			</Box>
			<Box className="additional"></Box>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	height: 88vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2rem;
	padding-inline: 2rem;
	background-color: #151515;
	.content {
		display: flex;
		gap: 2rem;
		justify-content: space-around;
	}
`;

export default GameDetails;
