import { useContext } from "react";
import { NetworkQueueContext } from "../contexts";

export const useNetworkQueue = () => {
	const { storageNetworkQueue, setStorageNetworkQueue } =
		useContext(NetworkQueueContext);

	return { storageNetworkQueue, setStorageNetworkQueue };
};
