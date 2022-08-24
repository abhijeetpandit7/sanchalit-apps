import { useContext } from "react";
import { UserCustomizationContext } from "../contexts";
import {
	HIDE_BACKGROUND_OVERLAY,
	HIDE_APPS,
	HIDE_VISIBILITY,
	removeRefClassName,
} from "../utils";

export const useUserCustomization = () => {
	const {
		storageUserCustomization,
		setStorageUserCustomization,
		appsRef,
		mainViewRef,
		settingsRef,
	} = useContext(UserCustomizationContext);

	const showApps = () => removeRefClassName(appsRef, HIDE_APPS);

	const showBackgroundOverlay = () =>
		removeRefClassName(mainViewRef, HIDE_BACKGROUND_OVERLAY);

	const showMainView = () => removeRefClassName(mainViewRef, HIDE_VISIBILITY);

	return {
		storageUserCustomization,
		setStorageUserCustomization,
		appsRef,
		mainViewRef,
		settingsRef,
		showApps,
		showBackgroundOverlay,
		showMainView,
	};
};
