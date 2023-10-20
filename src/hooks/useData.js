import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useData = (endpoint, requestConfig, deps = []) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		apiClient
			.get(endpoint, { ...requestConfig }) // appended endoing && requestConfig = params
			.then((res) => {
				if (res) {
					// const parsedData = res.data.results.map((item) => ({
					// 	...item,
					// 	liked: false,
					// }));
					setData(res.data.results);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, [...deps]); // array of deps for refetch

	return { data, error, isLoading };
};

export default useData;

// TODO:
// CLEANUP WITH AXIOS ABORT CONTROLER
