import axios from "axios";
import { URL_ROOT_API } from "./../utils";

export const useAxios = () => {
	const setAxiosBaseURL = ({ baseUrl = URL_ROOT_API } = {}) => {
		axios.defaults.baseURL = baseUrl;
	};

	const setAxiosIntercept = () => {
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				return Promise.reject(error);
			},
		);
	};

	const setAxiosAuthHeader = (token) => {
		if (token) axios.defaults.headers.common["Authorization"] = token;
		else delete axios.defaults.headers.common["Authorization"];
	};

	return {
		setAxiosBaseURL,
		setAxiosAuthHeader,
		setAxiosIntercept,
	};
};
