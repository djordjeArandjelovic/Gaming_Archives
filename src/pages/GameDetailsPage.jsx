import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import GameDetails from "../components/GameDetails";
import apiClient from "../services/api-client";
import { useParams } from "react-router-dom";

const GameDetailsPage = () => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	console.log(data);

	useEffect(() => {
		setIsLoading(true);
		apiClient
			.get(`/games/${id}`)
			.then((res) => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);
	return (
		<>
			<NavBar />
			<GameDetails data={data} isLoading={isLoading} />
		</>
	);
};

export default GameDetailsPage;
