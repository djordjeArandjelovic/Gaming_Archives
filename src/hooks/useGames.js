import useData from "./useData";

const useGames = (selectedGenre, searchText, selectedPlatform) =>
	useData(
		"/games",
		{
			params: {
				genres: selectedGenre?.id,
				search: searchText,
				platforms: selectedPlatform?.id,
			},
		},
		[selectedGenre?.id, searchText, selectedPlatform]
	);

export default useGames;
