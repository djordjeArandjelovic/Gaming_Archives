import useData from "./useData";

const useGames = (selectedGenre, searchText, selectedPlatform) =>
	useData(
		// endoint
		"/games",
		{
			// requestConfig
			params: {
				// when making a request axios is appending these query parameters to be included in the request URL in key:value form
				genres: selectedGenre?.id, // e.g. https://api.rawg.io/api/games?genres=5
				search: searchText, // e.g. https://api.rawg.io/api/games?search=action
				platforms: selectedPlatform?.id, // e.g. https://api.rawg.io/api/games?platforms=3
				// e.g. https://api.rawg.io/api/games?genres=5&search=action&platforms=3
			},
		},
		// deps for useEffect of useData
		[selectedGenre?.id, searchText, selectedPlatform]
	);

export default useGames;
