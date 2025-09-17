import axios from "axios";
import { useAuthActions } from "../hooks";
import {
	AUTH,
	CUSTOMIZATION,
	URL_ROOT_API,
	getExtensionStorageItem,
	getInstantDate,
	getLocalStorageItem,
	isBuildTargetWeb,
} from "./../utils";

const PARTIAL_CONTENT_STATUS = 206;
const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;
const ERROR_NO_CUSTOMIZATION = "Customization not found";
const ERROR_NO_USER = "User not found";

const getStorageItem = isBuildTargetWeb
	? getLocalStorageItem
	: getExtensionStorageItem;

const postUserCustomization = async () => {
	const auth = await getStorageItem(AUTH);
	const userCustomization = await getStorageItem(CUSTOMIZATION);
	if (!!auth?.userId === false) return;
	try {
		axios.post(
			"/userData",
			{ data: userCustomization },
			{ withCredentials: true },
		);
	} catch (error) {}
};

export const useAxios = () => {
	const { logOutUser } = useAuthActions();

	axios.interceptors.request.use((config) => {
		config.headers["X-Sanchalit-ClientDate"] = getInstantDate();
		return config;
	});

	const setAxiosBaseURL = ({ baseUrl = URL_ROOT_API } = {}) => {
		axios.defaults.baseURL = baseUrl;
		// TODO: Remove withCredentials, this allows cross-site Access-Control requests with credentials
		axios.defaults.withCredentials = true;
	};

	const setAxiosIntercept = () => {
		axios.interceptors.response.use(
			(response) => {
				if (response?.status === PARTIAL_CONTENT_STATUS) {
					if (response.data.message === ERROR_NO_CUSTOMIZATION) {
						postUserCustomization();
					}
				}
				return response;
			},
			async (error) => {
				if (error?.response?.status === UNAUTHORIZED_STATUS) {
					const auth = await getStorageItem(AUTH);
					if (!!auth?.userId) logOutUser();
				} else if (error?.response?.status === NOT_FOUND_STATUS) {
					switch (error.response.data.message) {
						case ERROR_NO_USER: {
							logOutUser();
							break;
						}
						case ERROR_NO_CUSTOMIZATION: {
							postUserCustomization();
							break;
						}
						default:
							break;
					}
				}
				return Promise.reject(error);
			},
		);
	};

	return {
		setAxiosBaseURL,
		setAxiosIntercept,
	};
};

