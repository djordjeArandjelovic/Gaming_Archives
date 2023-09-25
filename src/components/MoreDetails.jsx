import { Box, Button } from "@chakra-ui/react";
import React from "react";

const MoreDetails = ({ toggleView, setToggleView }) => {
	return (
		<Box ml={2.5}>
			<Button onClick={() => setToggleView(!toggleView)}>More details</Button>
		</Box>
	);
};

export default MoreDetails;
