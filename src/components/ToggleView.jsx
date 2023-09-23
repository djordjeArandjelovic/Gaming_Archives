import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { BsGrid, BsViewList } from "react-icons/bs";

const ToggleView = ({ setToggleView }) => {
	return (
		<Flex ml={2.5} gap={1} justify={"flex-end"} mr={3}>
			<Button
				onClick={() => setToggleView(true)}
				size={"md"}
				children={<BsGrid />}
			/>
			<Button
				onClick={() => setToggleView(false)}
				size={"md"}
				children={<BsViewList />}
			/>
		</Flex>
	);
};

export default ToggleView;
