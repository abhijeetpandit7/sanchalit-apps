import { useCallback, useContext } from "react";
import { UserCustomizationContext } from "../contexts";
import {
	HIDE_APPS,
	HIDE_BACKGROUND_OVERLAY,
	HIDE_VISIBILITY,
	addRefClassName,
	removeRefClassName,
} from "../utils";

export const useUserCustomization = () => {
	const {
		appsRef,
		countdownsRef,
		dashAppRef,
		displayNameRef,
		mainViewRef,
		notesInputRef,
		searchInputRef,
		settingsRef,
		todoAppRef,
		todoInputRef,
		storageUserCustomization,
		setStorageUserCustomization,
		widgetManager,
		widgetDispatch,
	} = useContext(UserCustomizationContext);

	const hideApps = useCallback(
		() => addRefClassName(appsRef, HIDE_APPS),
		[],
	);

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
		countdownsRef,
		dashAppRef,
		displayNameRef,
		mainViewRef,
		notesInputRef,
		searchInputRef,
		settingsRef,
		todoAppRef,
		todoInputRef,
		storageUserCustomization,
		setStorageUserCustomization,
		widgetManager,
		widgetDispatch,
		hideApps,
		showApps,
		showBackgroundOverlay,
		showMainView,
	};
};
