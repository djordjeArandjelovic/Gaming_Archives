import React, { useState } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Input,
	Button,
	useDisclosure,
	Box,
	FormControl,
	FormLabel,
	InputRightElement,
	InputGroup,
	Text,
	Stack,
	Image,
	useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import saber from "../assets/saber.png";
import { useAuth } from "../context/useAuth";
import GoogleButton from "react-google-button";

const LoginDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [psw, setPsw] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { googleSignIn, login, user, logout } = useAuth();
	const toast = useToast();
	const navigate = useNavigate();

	// DB

	// LOG IN
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			await login(email, psw);
			toast({
				title: "Success.",
				description: `Welcome ${email}`,
				status: "success",
				duration: 2500,
				isClosable: true,
				position: "top",
			});
		} catch (error) {
			toast({
				title: "Error.",
				description: error?.message,
				status: "error",
				duration: 2500,
				isClosable: true,
				position: "top",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// LOG IN WITH GOOGLE
	const handleGoogle = async () => {
		try {
			setIsLoading(true);
			await googleSignIn();
			navigate("/");
		} catch (error) {
			toast({
				title: "Error.",
				description: error?.message,
				status: "error",
				duration: 2500,
				isClosable: true,
				position: "top",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (user) {
		return (
			<Button
				colorScheme={"green"}
				onClick={logout}
				fontFamily={"StarWars"}
				fontWeight={"light"}
			>
				Logout
			</Button>
		);
	}

	return (
		<>
			<Button
				colorScheme="green"
				onClick={onOpen}
				fontFamily={"StarWars"}
				fontWeight={"light"}
			>
				Login
			</Button>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader
						textAlign={"center"}
						color={"blue.400"}
						className="login"
						fontFamily={"StarWars"}
						letterSpacing={"1px"}
					>
						Log in
					</DrawerHeader>
					<DrawerHeader
						textAlign={"center"}
						color={"blue.400"}
						className="obiWan"
						fontFamily={"StarWars"}
						fontWeight={"light"}
						letterSpacing={"1px"}
					>
						Welcome back, old <span className="closeQuote">friend.</span>
					</DrawerHeader>

					<DrawerBody>
						<Box rounded={"lg"} boxShadow={"lg"} p={8}>
							<form onSubmit={handleSubmit}>
								<FormControl id="email">
									<FormLabel fontFamily={"StarWars"}>Email address</FormLabel>
									<Input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										type="email"
									/>
								</FormControl>
								<FormControl id="password">
									<FormLabel marginTop={1} fontFamily={"StarWars"}>
										Password
									</FormLabel>
									<InputGroup>
										<Input
											value={psw}
											onChange={(e) => setPsw(e.target.value)}
											autoComplete="off"
											type={showPassword ? "text" : "password"}
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowPassword((showPassword) => !showPassword)
												}
											>
												{showPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
								<Stack spacing={10} pt={2} className="saberHolder">
									<Image className="saber" src={saber} />
									<Button
										type="submit"
										loadingText="Submitting"
										size="xs"
										bg={"blue.400"}
										color={"white"}
										transition="0.5s"
										fontFamily={"StarWars"}
										letterSpacing={"1px"}
										fontWeight={"light"}
										_hover={{
											bg: "blue.200",
											letterSpacing: "2px",
											color: "#000",
											margin: "0.7 auto 0 auto",
											width: "72%",
										}}
										width={"25%"}
										margin={"0.7rem auto 0 8rem"}
										isDisabled={isLoading ? true : false}
									>
										{isLoading ? "Please wait..." : "Login"}
									</Button>
									<Box
										display={"flex"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<GoogleButton onClick={handleGoogle} />
									</Box>
								</Stack>
							</form>
							<Stack pt={6}>
								<Box
									align={"center"}
									fontWeight={"light"}
									fontFamily={"StarWars"}
									letterSpacing={"1px"}
								>
									Don't have an account?
									<Link
										style={{ color: "#89CFF0", marginLeft: "0.2rem" }}
										to="/signup"
									>
										<Text
											color={"blue.400"}
											display={"inline"}
											_hover={{ color: "blue.300" }}
										>
											Sign up
										</Text>
									</Link>
								</Box>
							</Stack>
						</Box>
					</DrawerBody>

					<DrawerFooter>
						<Button
							fontFamily={"StarWars"}
							fontWeight={"light"}
							letterSpacing={"1px"}
							variant="outline"
							mr={3}
							onClick={onClose}
						>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default LoginDrawer;
