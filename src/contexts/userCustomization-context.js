import React, { createContext, useRef, useState } from "react";

export const UserCustomizationContext = createContext();

export const UserCustomizationProvider = ({ children }) => {
	const [storageUserCustomization, setStorageUserCustomization] = useState({});

	const appsRef = useRef(null);
	const mainViewRef = useRef(null);

	return (
		<UserCustomizationContext.Provider
			value={{
				storageUserCustomization,
				setStorageUserCustomization,
				appsRef,
				mainViewRef,
			}}
		>
			{children}
		</UserCustomizationContext.Provider>
	);
};
