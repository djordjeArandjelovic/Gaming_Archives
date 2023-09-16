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
	Heading,
} from "@chakra-ui/react";
import saber from "../assets/saber.png";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/useAuth";
import GoogleButton from "react-google-button";

const Login = () => {
	const [email, setEmail] = useState("");
	const [psw, setPsw] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { googleSignIn, login } = useAuth();

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
		}
	};

	return (
		<>
			<Box
				maxW={{
					base: "100%",
					md: "55%",
					lg: "45%",
				}}
				margin={"2rem auto"}
				display={"flex"}
				flexDir={"column"}
				gap={10}
			>
				<Box>
					<Heading
						as={"h1"}
						textAlign={"center"}
						color={"blue.400"}
						className="login"
						fontFamily={"StarWars"}
						letterSpacing={"1px"}
					>
						Login
					</Heading>
					<Heading
						as={"h2"}
						textAlign={"center"}
						color={"blue.400"}
						className="obiWan"
						fontFamily={"StarWars"}
						fontWeight={"light"}
						letterSpacing={"1px"}
					>
						Welcome back, old <span className="closeQuote">friend.</span>
					</Heading>
				</Box>
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
									width: "80%",
								}}
								width={"25%"}
								margin={"0.7rem auto 0 8rem"}
								isDisabled={isLoading ? true : false}
							>
								{isLoading ? "Please wait..." : "Login"}
							</Button>
							{/* <Button
								colorScheme={"green"}
								type="button"
								onClick={handleGoogle}
								mt={3}
								isDisabled={isLoading ? true : false}
							>
								{isLoading ? "Please wait..." : "Sign in with GOOGLE"}
							</Button> */}
							<Box
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<GoogleButton
									onClick={handleGoogle}
									isDisabled={isLoading ? true : false}
								/>
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
			</Box>
		</>
	);
};

export default Login;
