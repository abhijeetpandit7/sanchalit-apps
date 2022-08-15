import { useContext } from "react";
import { UserCustomizationContext } from "../contexts";

export const useUserCustomization = () => {
	const {
		storageUserCustomization,
		setStorageUserCustomization,
	} = useContext(UserCustomizationContext);

	return {
		storageUserCustomization,
		setStorageUserCustomization,
	};
};
