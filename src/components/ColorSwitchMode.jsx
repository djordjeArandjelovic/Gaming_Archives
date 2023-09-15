import { HStack, Switch, useColorMode, Icon } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ColorSwitchMode = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<HStack>
			<Switch
				colorScheme="purple"
				isChecked={colorMode === "dark"}
				onChange={toggleColorMode}
			/>
			<Icon as={colorMode === "dark" ? MoonIcon : SunIcon} />
		</HStack>
	);
};

export default ColorSwitchMode;
