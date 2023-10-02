import {
	Heading,
	List,
	ListIcon,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../context/useAuth";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const WishListOverview = ({ wishList }) => {
	const { user } = useAuth();
	const { colorMode } = useColorMode();
	if (!user) {
		return (
			<List paddingX={"10px"} mt={10} width={"200px"}>
				<Heading
					color={colorMode === "dark" ? "#F7B263" : ""}
					fontSize={"xl"}
					mb={2}
					mt={2}
				>
					Currently in WishList:
				</Heading>
				<Text>Please log in to have access to wishlist...</Text>;
			</List>
		);
	}
	return (
		<List paddingX={"10px"} mt={10} width={"200px"}>
			<Heading
				color={colorMode === "dark" ? "#F7B263" : ""}
				fontSize={"xl"}
				mb={2}
				mt={2}
			>
				Currently in WishList:
			</Heading>
			{wishList?.map((game) => (
				<ListItem key={game?.id}>
					<ListIcon as={InfoOutlineIcon} color="#F7B263" />
					{game?.name}
				</ListItem>
			))}
		</List>
	);
};

export default WishListOverview;
