import { useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useAuth, useUserCustomization } from "../hooks";
import { DEFAULT_AUTHENTICATION, DEFAULT_CUSTOMIZATION } from "../utils";

const DEBOUNCE_TIME = 1;
const MAX_DEBOUNCE_TIME = 10;

export const useAuthActions = () => {
	const { storageAuth, setStorageAuth } = useAuth();
	const { setStorageUserCustomization } = useUserCustomization();

	const deleteUserData = useCallback(
		async (endpoint, payload) => {
			if (!!storageAuth?.token === false) return;
			try {
				await axios.delete(endpoint, { data: payload });
			} catch (error) {}
		},
		[storageAuth.token],
	);

	const logOutUser = useCallback(async () => {
		setStorageAuth(DEFAULT_AUTHENTICATION);
		setStorageUserCustomization(DEFAULT_CUSTOMIZATION);
	}, []);

	const postUserData = useCallback(
		async (endpoint, payload) => {
			if (!!storageAuth?.token === false) return;
			try {
				await axios.post(endpoint, { data: payload });
			} catch (error) {}
		},
		[storageAuth.token],
	);
	const debouncedPostUserData = useCallback(
		debounce(postUserData, DEBOUNCE_TIME * 1000, {
			maxWait: MAX_DEBOUNCE_TIME * 1000,
		}),
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
		debouncedPostUserData,
		deleteUserData,
		logOutUser,
		postUserData,
		setSubscriptionSummary,
		signUpUser,
	};
};
