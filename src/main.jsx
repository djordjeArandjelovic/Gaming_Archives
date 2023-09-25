import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppContext from "./context/context.jsx";
import "./index.css";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme} />
			<AppContext>
				<App />
			</AppContext>
		</ChakraProvider>
	</React.StrictMode>
);
