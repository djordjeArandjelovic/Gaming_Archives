import useData from "./useData";

const usePlatforms = () => useData("/platforms/lists/parents"); // endpoint, no params needed

export default usePlatforms;
