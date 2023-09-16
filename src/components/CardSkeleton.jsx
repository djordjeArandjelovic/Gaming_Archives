import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const CardSkeleton = () => {
	return (
		<Card
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
