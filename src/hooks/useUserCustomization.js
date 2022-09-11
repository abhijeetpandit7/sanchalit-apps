import { useCallback, useContext } from "react";
import { UserCustomizationContext } from "../contexts";
import {
	EDITING,
	EMPTY_NAME,
	INPUT_WRAPPER,
	PULSE,
	HIDE_BACKGROUND_OVERLAY,
	HIDE_APPS,
	HIDE_VISIBILITY,
	focusDisplayName,
	removeRefClassName,
	toggleRefClassName,
} from "../utils";

export const useUserCustomization = () => {
	const {
		storageUserCustomization,
		setStorageUserCustomization,
		appsRef,
		displayNameRef,
		mainViewRef,
		settingsRef,
	} = useContext(UserCustomizationContext);

	// TODO: Prevent re-render on every setStorageUserCustomization
	const editDisplayName = async () => {
		const { displayName, displayNameVisible } = storageUserCustomization;
		displayNameVisible === false && (await toggleDisplayNameVisible());

		const element = displayNameRef.current;
		element.setAttribute("contenteditable", true);
		toggleRefClassName(displayNameRef, EDITING);
		toggleRefClassName(displayNameRef, INPUT_WRAPPER);
		toggleRefClassName(displayNameRef, PULSE);
		setTimeout(() => removeRefClassName(displayNameRef, PULSE), 500);
		let isDisplayNameEmpty = false;
		if (!displayName) {
			await setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayName: EMPTY_NAME,
			}));
			isDisplayNameEmpty = true;
		}
		focusDisplayName(displayNameRef);

		element.addEventListener(
			"keypress",
			(event) => event.keyCode === 13 && saveDisplayName(isDisplayNameEmpty),
		);
		element.addEventListener(
			"blur",
			() => saveDisplayName(isDisplayNameEmpty),
			{
				once: true,
			},
		);
	};

	const saveDisplayName = (isDisplayNameEmpty) => {
		const element = displayNameRef.current;
		element.setAttribute("contenteditable", false);
		removeRefClassName(displayNameRef, EDITING);
		removeRefClassName(displayNameRef, INPUT_WRAPPER);
		toggleRefClassName(displayNameRef, PULSE);
		setTimeout(() => removeRefClassName(displayNameRef, PULSE), 500);

		const newName = element.innerText;
		if (newName)
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayName: newName,
			}));
		else if (isDisplayNameEmpty)
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayName: "",
			}));
		else element.innerText = storageUserCustomization.displayName;
	};

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

	const toggleDisplayNameVisible = () =>
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			displayNameVisible: !prevCustomization.displayNameVisible,
		}));

	return {
		storageUserCustomization,
		setStorageUserCustomization,
		appsRef,
		displayNameRef,
		mainViewRef,
		settingsRef,
		editDisplayName,
		showApps,
		showBackgroundOverlay,
		showMainView,
	};
};
