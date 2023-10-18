import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGameDetails from "../hooks/useGameDetails";
import apiClient from "../services/api-client";
import { Box, Flex, Image, Spinner } from "@chakra-ui/react";
import styled from "styled-components";

const GameDetails = ({ data, isLoading }) => {
	// const { id } = useParams();
	// const [data, setData] = useState(null);
	// const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	apiClient
	// 		.get(`/games/${id}`)
	// 		.then((res) => {
	// 			setData(res.data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	console.log(data);

	if (isLoading) {
		return (
			<Flex height={"100vh"} justify={"center"} align={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	const croppedUrl = (url) => {
		const index = url?.indexOf("media/") + "media/".length;
		return url?.slice(0, index) + "crop/600/400/" + url?.slice(index);
	};

	return (
		<Wrapper>
			<div className="header">{data?.name}</div>
			<Box className="content">
				<Box className="img">
					<Image src={croppedUrl(data?.background_image)} borderRadius={10} />
				</Box>
				<Box className="desc"></Box>
			</Box>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	height: 88vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2rem;
	background-color: #151515;
	.header {
		font-size: 2rem;
	}
	.content {
	}
`;

export default GameDetails;
