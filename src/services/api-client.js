import axios from "axios";

export default axios.create({
	baseURL: "https://api.rawg.io/api",
	params: {
		key: "504ff04a3b1f4df9873ae7cdc3381a54",
	},
});
