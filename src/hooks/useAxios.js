import axios from "axios";
import { useAuthActions } from "../hooks";
import { URL_ROOT_API } from "./../utils";

const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;

export const useAxios = () => {
	const { logOutUser } = useAuthActions();

	const setAxiosBaseURL = ({ baseUrl = URL_ROOT_API } = {}) => {
		axios.defaults.baseURL = baseUrl;
	};

	const setAxiosIntercept = () => {
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (
					[UNAUTHORIZED_STATUS, NOT_FOUND_STATUS].includes(
						error?.response?.status,
					)
				) {
					logOutUser();
				}
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
