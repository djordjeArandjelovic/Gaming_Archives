import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
};

const theme = extendTheme({
	config,
	// styles: {
	// 	dark: {
	// 		body: {
	// 			bg: "#151515",
	// 			color: "white",
	// 		},
	// 	},
	// },
});

export default theme;
