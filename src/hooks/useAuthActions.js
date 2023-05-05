import { useCallback } from "react";
import axios from "axios";
import { useAuth, useUserCustomization } from "../hooks";
import { DEFAULT_AUTHENTICATION, DEFAULT_CUSTOMIZATION } from "../utils";

export const useAuthActions = () => {
	const { setStorageAuth } = useAuth();
	const { setStorageUserCustomization } = useUserCustomization();

	const logOutUser = useCallback(async () => {
		setStorageAuth(DEFAULT_AUTHENTICATION);
		setStorageUserCustomization(DEFAULT_CUSTOMIZATION);
	}, []);

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
		logOutUser,
		setSubscriptionSummary,
		signUpUser,
	};
};
