import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsGrid, BsViewList } from "react-icons/bs";

const ToggleView = ({ setToggleView, toggleView }) => {
	return (
		<Flex ml={2.5} gap={1} justify={"flex-end"} align={"center"} mr={3}>
			<Text>Display:</Text>
			<Button
				onClick={() => setToggleView(true)}
				size={"md"}
				children={<BsGrid />}
				bg={toggleView === true ? "gray.500" : null}
			/>
			<Button
				onClick={() => setToggleView(false)}
				size={"md"}
				children={<BsViewList />}
				bg={toggleView === false ? "gray.500" : null}
			/>
		</Flex>
	);
};

export default ToggleView;
