import React, { createContext, useState } from "react";

export const NetworkQueueContext = createContext();

export const NetworkQueueProvider = ({ children }) => {
	const [storageNetworkQueue, setStorageNetworkQueue] = useState({});

	return (
		<NetworkQueueContext.Provider
			value={{
				storageNetworkQueue,
				setStorageNetworkQueue,
			}}
		>
			{children}
		</NetworkQueueContext.Provider>
	);
};
