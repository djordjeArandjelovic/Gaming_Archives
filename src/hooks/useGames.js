import useData from "./useData";

const useGames = (selectedGenre, searchText) =>
	useData(
		"/games",
		{ params: { genres: selectedGenre?.id, search: searchText } },
		[selectedGenre?.id, searchText]
	);

export default useGames;
