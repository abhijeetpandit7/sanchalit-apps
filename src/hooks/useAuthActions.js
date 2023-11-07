import { useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import * as amplitude from "@amplitude/analytics-browser";
import {
	useAuth,
	useNetworkQueue,
	useNetworkQueueActions,
	useUserCustomization,
} from "../hooks";
import {
	DEFAULT_AUTHENTICATION,
	DEFAULT_CUSTOMIZATION,
	DEFAULT_NETWORK_QUEUE,
	addOrMergeObjectProperties,
	isObjectEmpty,
} from "../utils";

const DEBOUNCE_TIME = 1;
const MAX_DEBOUNCE_TIME = 10;

export const useAuthActions = () => {
	const { storageAuth, setStorageAuth } = useAuth();
	const { setStorageUserCustomization, networkRequestDispatch } =
		useUserCustomization();
	const { setStorageNetworkQueue } = useNetworkQueue();
	const { setDeleteUserData, setPostUserData } = useNetworkQueueActions();

	const deleteUserData = useCallback(
		async (endpoint, payload) => {
			if (!!storageAuth?.token === false) return;
			try {
				const response = await axios.delete(endpoint, { data: payload });
				return response.data;
			} catch (error) {
				setDeleteUserData(
					endpoint,
					error.config.data && JSON.parse(error.config.data),
				);
			}
		},
		[storageAuth.token],
	);

	const getUserSettings = useCallback(async (isProfileDetailsRequested) => {
		try {
			const response = await axios.get(
				`/userData/settings${
					isProfileDetailsRequested ? "?profileDetails=1" : ""
				}`,
			);
			return response.data;
		} catch (error) {}
	}, []);

	const logOutUser = useCallback(async () => {
		setStorageAuth(DEFAULT_AUTHENTICATION);
		setStorageUserCustomization(DEFAULT_CUSTOMIZATION);
		setStorageNetworkQueue(DEFAULT_NETWORK_QUEUE);
		amplitude.reset();
	}, []);

	const postUserData = useCallback(
		async (endpoint, payload) => {
			if (!!storageAuth?.token === false) return;
			try {
				const response = await axios.post(endpoint, { data: payload });
				if (response.data?.success) {
					let { customization } = response.data;
					if (!!(customization && isObjectEmpty(customization) === false))
						await setStorageUserCustomization((prevCustomization) =>
							addOrMergeObjectProperties(
								prevCustomization,
								customization,
								true,
							),
						);
				}
				return response.data;
			} catch (error) {
				setPostUserData(endpoint, JSON.parse(error.config.data));
			}
		},
		[storageAuth.token],
	);

	const debouncedPostUserData = useCallback(
		debounce(
			(endpoint, payload) => {
				postUserData(endpoint, payload);
				networkRequestDispatch({
					type: "RESET_PAYLOAD",
				});
			},
			DEBOUNCE_TIME * 1000,
			{
				maxWait: MAX_DEBOUNCE_TIME * 1000,
			},
		),
		[storageAuth.token],
	);

	const setSubscriptionSummary = useCallback(
		(data) =>
			setStorageAuth((prevAuth) => ({
				...prevAuth,
				subscriptionSummary: {
					...prevAuth.subscriptionSummary,
					...data,
				},
			})),
		[],
	);

	const signUpUser = useCallback(async () => {
		try {
			const response = await axios.post("/user/register");
			return response.data;
		} catch (error) {}
	}, []);

	return {
		postUserData,
		debouncedPostUserData,
		deleteUserData,
		getUserSettings,
		logOutUser,
		setSubscriptionSummary,
		signUpUser,
	};
};
