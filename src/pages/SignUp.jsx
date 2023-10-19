import React from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Image,
	useToast,
	Center,
	useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import saber from "../assets/saber.png";
import { useAuth } from "../context/useAuth";
import GoogleButton from "react-google-button";
import { FcGoogle } from "react-icons/fc";

// REGEX
const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^.+\@.+\..+.{2,4}$/;

const SignUp = () => {
	const { colorMode } = useColorMode();
	const navigate = useNavigate();
	const toast = useToast();
	const nameRef = useRef();
	const { register, googleSignIn } = useAuth();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [psw, setPsw] = useState("");
	const [validPsw, setValidPsw] = useState(false);
	const [pswFocus, setPswFocus] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	useEffect(() => {
		const emailRes = EMAIL_REGEX.test(email);
		setValidEmail(emailRes);
	}, [email]);

	useEffect(() => {
		const pswRes = PSW_REGEX.test(psw);
		setValidPsw(pswRes);
	}, [psw]);

	// SIGN UP

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !psw || !validEmail || !validPsw) {
			setErrMsg("Invalid entry");
			return;
		} else if (validEmail && validPsw) {
			try {
				setIsLoading(true);
				await register(email, psw);
				toast({
					title: "Success.",
					description: `User ${email} successfully registered!`,
					status: "success",
					duration: 2500,
					isClosable: true,
					position: "top",
				});
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
		}
	};

	// GOOGLE SIGN UP
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
			<Flex minH={"100vh"} align={"center"} justify={"center"}>
				<Stack
					className="signUpStack"
					spacing={8}
					mx={"auto"}
					maxW={"lg"}
					py={2}
					px={2}
				>
					<Image className="leftSaber" src={saber} />
					<Box className="sithSaber" />
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Sign up
						</Heading>
						<Heading
							className="yoda"
							textAlign={"center"}
							color={"green.400"}
							fontFamily={"StarWars"}
							letterSpacing={"1px"}
						>
							Do. or do Not. There is no <span>try.</span>
						</Heading>
					</Stack>
					<Box rounded={"lg"} boxShadow={"lg"} p={8}>
						<p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
						<form onSubmit={handleSubmit} noValidate>
							<Stack spacing={4}>
								<HStack>
									<Box>
										<FormControl id="firstName" isRequired>
											<FormLabel fontFamily={"StarWars"} fontWeight={"light"}>
												First Name
											</FormLabel>
											<Input ref={nameRef} type="text" />
										</FormControl>
									</Box>
									<Box>
										<FormControl id="lastName">
											<FormLabel fontFamily={"StarWars"} fontWeight={"light"}>
												Last Name
											</FormLabel>
											<Input type="text" />
										</FormControl>
									</Box>
								</HStack>
								<FormControl id="email" isRequired>
									<FormLabel fontFamily={"StarWars"} fontWeight={"light"}>
										<label>
											Email address
											<FontAwesomeIcon
												icon={faCheck}
												className={validEmail ? "valid" : "hide"}
											/>
											<FontAwesomeIcon
												icon={faTimes}
												className={validEmail || !email ? "hide" : "invalid"}
											/>
										</label>
									</FormLabel>
									<Input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onFocus={() => setEmailFocus(true)}
										onBlur={() => setEmailFocus(false)}
									/>
									<p
										className={
											email && emailFocus && !validEmail
												? "instructions"
												: "hide"
										}
									>
										<FontAwesomeIcon icon={faInfoCircle} />
										Please provide a valid email.
									</p>
								</FormControl>
								<FormControl id="password" isRequired>
									<FormLabel fontFamily={"StarWars"} fontWeight={"light"}>
										<label>
											Password
											<FontAwesomeIcon
												icon={faCheck}
												className={validPsw ? "valid" : "hide"}
											/>
											<FontAwesomeIcon
												icon={faTimes}
												className={validPsw || !psw ? "hide" : "invalid"}
											/>
										</label>
									</FormLabel>
									<InputGroup display={"flex"} flexDirection="column">
										<Input
											position="relative"
											autoComplete="off"
											type={showPassword ? "text" : "password"}
											value={psw}
											onChange={(e) => setPsw(e.target.value)}
											onFocus={() => setPswFocus(true)}
											onBlur={() => setPswFocus(false)}
										/>
										<InputRightElement h={"full"}>
											<Button
												position="absolute"
												top="0"
												left="0"
												variant={"ghost"}
												_hover={{
													outline: "none",
												}}
												onClick={() =>
													setShowPassword((showPassword) => !showPassword)
												}
											>
												{showPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
										<p
											className={
												pswFocus && psw && !validPsw ? "instructions" : "hide"
											}
										>
											<FontAwesomeIcon icon={faInfoCircle} />
											8 to 24 characters.
											<br />
											Must include uppercase and lowercase letters, a number and
											a special character.
											<br />
											Allowed special characters: !, @, #, $, %.
										</p>
									</InputGroup>
								</FormControl>
								<Stack spacing={4} pt={2}>
									<Button
										loadingText="Submitting"
										size="lg"
										bg={"green.400"}
										color={"white"}
										_hover={{
											bg: "green.200",
											letterSpacing: "2px",
											color: "#000",
										}}
										type="submit"
										transition="0.5s"
										fontFamily={"StarWars"}
										fontWeight={"light"}
										letterSpacing={"1px"}
									>
										Sign up
									</Button>
									<Box
										display={"flex"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										{/* <GoogleButton onClick={handleGoogle} /> */}
										<Button
											w={"full"}
											variant={"solid"}
											leftIcon={<FcGoogle />}
											colorScheme={"blue"}
											onClick={handleGoogle}
										>
											<Center>
												<Text>Sign in with Google</Text>
											</Center>
										</Button>
									</Box>
								</Stack>
								<Stack>
									<Text align={"center"}>
										Already a user?
										<Link
											style={{ color: "#89CFF0", marginLeft: "0.5rem" }}
											to="/"
										>
											<Text as={"span"} display="inline" color={"green.400"}>
												Login
											</Text>
										</Link>
									</Text>
								</Stack>
							</Stack>
						</form>
					</Box>
					<Box className="jediSaber" />
					<Image className="rightSaber" src={saber} />
				</Stack>
			</Flex>
		</>
	);
};

export default SignUp;
