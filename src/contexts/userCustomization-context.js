import React, { createContext, useRef, useState } from "react";

export const UserCustomizationContext = createContext();

export const UserCustomizationProvider = ({ children }) => {
	const [storageUserCustomization, setStorageUserCustomization] = useState({});

	const appsRef = useRef(null);
	const displayNameRef = useRef(null);
	const mainViewRef = useRef(null);
	const settingsRef = useRef(null);

	return (
		<UserCustomizationContext.Provider
			value={{
				appsRef,
				displayNameRef,
				mainViewRef,
				settingsRef,
				storageUserCustomization,
				setStorageUserCustomization,
			}}
		>
			{children}
		</UserCustomizationContext.Provider>
	);
};
