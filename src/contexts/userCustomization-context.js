import React, { createContext, useRef, useState } from "react";

export const UserCustomizationContext = createContext();

export const UserCustomizationProvider = ({ children }) => {
	const [storageUserCustomization, setStorageUserCustomization] = useState({});

	const appsRef = useRef(null);
	const mainViewRef = useRef(null);
	const settingsRef = useRef(null);

	return (
		<UserCustomizationContext.Provider
			value={{
				storageUserCustomization,
				setStorageUserCustomization,
				appsRef,
				mainViewRef,
				settingsRef,
			}}
		>
			{children}
		</UserCustomizationContext.Provider>
	);
};
