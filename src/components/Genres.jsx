import React from "react";
import {
	Button,
	HStack,
	Image,
	List,
	ListItem,
	Spinner,
} from "@chakra-ui/react";

import logo from "../assets/logo.svg";
import useData from "../hooks/useData";

const Genres = ({ onSelectGenre, selectedGenre }) => {
	const { data, isLoading, error } = useData("/genres");

	const croppedUrl = (url) => {
		const index = url.indexOf("media/") + "media/".length;
		return url.slice(0, index) + "crop/600/400/" + url.slice(index);
	};

	if (isLoading) return <Spinner />;
	if (error) return null;

	return (
		<>
			<List paddingX={"5px"}>
				<ListItem>
					<HStack>
						<Image
							backgroundColor={"#fff"}
							boxSize={"32px"}
							borderRadius={8}
							src={logo}
						/>
						<Button
							variant="link"
							fontSize={"lg"}
							value={null}
							onClick={() => onSelectGenre([])}
						>
							Top Rated Games
						</Button>
					</HStack>
				</ListItem>
				{data.map((genre) => (
					<ListItem key={genre.id} paddingY={"5px"}>
						<HStack>
							<Image
								src={croppedUrl(genre.image_background)}
								objectFit="cover"
								boxSize={"32px"}
								borderRadius={8}
							/>
							<Button
								variant="link"
								fontSize={"lg"}
								value={genre.name}
								fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
								color={genre.id === selectedGenre?.id ? "purple.500" : ""}
								onClick={() => onSelectGenre(genre)}
							>
								{genre.name}
							</Button>
						</HStack>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default Genres;
