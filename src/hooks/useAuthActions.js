import { useCallback } from "react";
import { useAuth } from "../hooks";

export const useAuthActions = () => {
	const { setStorageAuth } = useAuth();
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

	}, []);

	return {
		setSubscriptionSummary,
	};
};
