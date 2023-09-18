import { Box, Image, keyframes } from "@chakra-ui/react";
import bb8 from "../assets/bb8rolling.gif";
import React from "react";

const animation = keyframes`
	0% {
		transform: translateX(0)
	}
	50% {
		transform: translateX(18rem)
	}
	100% {
		transform: translateX(0)
	}
	
`;

const AnimationBB8 = () => {
	const moveLeft = `${animation} infinite 10s`;
	return (
		<Box
			width={"25%"}
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
				animation={moveLeft}

				// top={"0.5rem"}
			/>
		</Box>
	);
};

export default AnimationBB8;
