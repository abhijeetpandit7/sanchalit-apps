import React, { createContext, useReducer, useRef, useState } from "react";
import { widgetReducer } from "../reducers";
import {
	API,
	BACKGROUND,
	PHOTO_INFO,
	DASH_APP_STYLES,
	GENERAL_SETTING_APP_LIST,
} from "../utils";

export const UserCustomizationContext = createContext();

export const UserCustomizationProvider = ({ children }) => {
	const [storageUserCustomization, setStorageUserCustomization] = useState({});

	const appsRef = useRef(null);
	const countdownsRef = useRef(null);
	const dashAppRef = useRef(null);
	const displayNameRef = useRef(null);
	const mainViewRef = useRef(null);
	const notesInputRef = useRef(null);
	const searchInputRef = useRef(null);
	const settingsRef = useRef(null);
	const todoInputRef = useRef(null);	

	const [widgetManager, widgetDispatch] = useReducer(widgetReducer, {
		app: GENERAL_SETTING_APP_LIST.reduce(
			(acc, app) => {
				app.ignoreVisibility
					? null
					: (acc[app.name] = { visibilityKey: app.key, ready: false });
				return acc;
			},
			{
				[PHOTO_INFO]: { ready: false },
			},
		),
		data: {
			[API]: {
				ready: false,
			},
			[BACKGROUND]: {
				ready: false,
			},
		},
		dashApp: {
			app: null,
			currentCountdownId: null,
			styles: {
				...DASH_APP_STYLES,
			},
		},
		settingsActiveNav: null,
	});

	return (
		<UserCustomizationContext.Provider
			value={{
				appsRef,
				countdownsRef,
				dashAppRef,
				displayNameRef,
				mainViewRef,
				notesInputRef,
				searchInputRef,
				settingsRef,
				todoInputRef,
				storageUserCustomization,
				setStorageUserCustomization,
				widgetManager,
				widgetDispatch,
			}}
		>
			{children}
		</UserCustomizationContext.Provider>
	);
};
