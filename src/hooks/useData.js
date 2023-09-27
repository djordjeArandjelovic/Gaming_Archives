import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useData = (endpoint, requestConfig, deps = []) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);
		apiClient
			.get(endpoint, { signal: controller.signal, ...requestConfig })
			.then((res) => {
				if (res) {
					const parsedData = res.data.results.map((item) => ({
						...item,
						liked: false,
					}));
					setData(parsedData);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
				setIsLoading(false);
			});

		return () => controller.abort();
	}, [...deps]);

	return { data, setData, error, isLoading };
};

export default useData;
