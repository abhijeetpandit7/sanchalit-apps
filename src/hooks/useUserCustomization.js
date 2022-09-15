import { useCallback, useContext } from "react";
import { UserCustomizationContext } from "../contexts";
import {
	HIDE_APPS,
	HIDE_BACKGROUND_OVERLAY,
	HIDE_VISIBILITY,
	removeRefClassName,
} from "../utils";

export const useUserCustomization = () => {
	const {
		appsRef,
		displayNameRef,
		mainViewRef,
		settingsRef,
		storageUserCustomization,
		setStorageUserCustomization,
		widgetManager,
		widgetDispatch,
	} = useContext(UserCustomizationContext);

	const showApps = useCallback(
		() => removeRefClassName(appsRef, HIDE_APPS),
		[],
	);

	const showBackgroundOverlay = useCallback(
		() => removeRefClassName(mainViewRef, HIDE_BACKGROUND_OVERLAY),
		[],
	);

	const showMainView = useCallback(
		() => removeRefClassName(mainViewRef, HIDE_VISIBILITY),
		[],
	);

	return {
		appsRef,
		displayNameRef,
		mainViewRef,
		settingsRef,
		storageUserCustomization,
		setStorageUserCustomization,
		widgetManager,
		widgetDispatch,
		showApps,
		showBackgroundOverlay,
		showMainView,
	};
};
