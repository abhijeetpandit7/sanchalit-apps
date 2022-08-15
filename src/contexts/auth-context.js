import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [storageAuth, setStorageAuth] = useState({});

	return (
		<AuthContext.Provider
			value={{
				storageAuth,
				setStorageAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
