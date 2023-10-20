import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import GameDetails from "../components/GameDetails";
import apiClient from "../services/api-client";
import { useParams } from "react-router-dom";

const GameDetailsPage = () => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

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
	}, [id]);

	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	} else {
		return (
			<>
				<NavBar />
				<GameDetails data={data} isLoading={isLoading} />
			</>
		);
	}
};

export default GameDetailsPage;
