import { useEffect } from "react";
import { useAuth, useUserCustomization } from "../hooks";
import {
	AUTH,
	CUSTOMIZATION,
	DEFAULT_AUTHENTICATION,
	DEFAULT_CUSTOMIZATION,
	getLocalStorageItem,
	isObjectEmpty,
	setLocalStorageItem,
} from "../utils";

export const useAuthPersist = () => {
	const { storageAuth, setStorageAuth } = useAuth();
	const { storageUserCustomization, setStorageUserCustomization } =
		useUserCustomization();

	useEffect(() => {
		(async () => {
		})();
	}, [storageUserCustomization]);

	useEffect(() => {
		(async () => {
			let auth = await JSON.parse(getLocalStorageItem(AUTH));
			let userCustomization = await JSON.parse(
				getLocalStorageItem(CUSTOMIZATION),
			);

			if (isObjectEmpty(auth)) auth = DEFAULT_AUTHENTICATION;
			if (isObjectEmpty(userCustomization))
				userCustomization = DEFAULT_CUSTOMIZATION;

			setStorageAuth(auth);
			setStorageUserCustomization(userCustomization);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (
				isObjectEmpty(storageAuth) === false &&
				isObjectEmpty(storageUserCustomization) === false
			) {
				await setLocalStorageItem(AUTH, JSON.stringify(storageAuth));
				await setLocalStorageItem(
					CUSTOMIZATION,
					JSON.stringify(storageUserCustomization),
				);
			}
		})();
	}, [storageAuth, storageUserCustomization]);
};
