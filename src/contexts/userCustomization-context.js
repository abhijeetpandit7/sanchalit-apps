import React, { createContext, useState } from "react";

export const UserCustomizationContext = createContext();

export const UserCustomizationProvider = ({ children }) => {
	const [storageUserCustomization, setStorageUserCustomization] = useState({});


	return (
		<UserCustomizationContext.Provider
			value={{
				storageUserCustomization,
				setStorageUserCustomization,
			}}
		>
			{children}
		</UserCustomizationContext.Provider>
	);
};
