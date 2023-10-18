import useData from "./useData";

const useGameDetails = (id) => useData(`/games/${id}`);

export default useGameDetails;
