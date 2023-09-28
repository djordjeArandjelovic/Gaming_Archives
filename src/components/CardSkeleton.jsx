import {
	Card,
	CardBody,
	Skeleton,
	SkeletonText,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";

const CardSkeleton = () => {
	const { colorMode } = useColorMode();
	return (
		<Card
			bg={colorMode === "dark" ? "#202020" : ""}
			width={{
				base: "90%",
				md: "250px",
				lg: "250px",
				xl: "250px",
			}}
			borderRadius={10}
			overflow="hidden"
		>
			<Skeleton height={"200px"} />
			<CardBody>
				<SkeletonText />
			</CardBody>
		</Card>
	);
};

export default CardSkeleton;
