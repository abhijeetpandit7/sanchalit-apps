import { useCallback } from "react";
import { useNetworkQueue } from "../hooks";
import { DEFAULT_NETWORK_QUEUE, addOrMergeObjectProperties } from "../utils";

export const useNetworkQueueActions = () => {
	const { setStorageNetworkQueue } = useNetworkQueue();

	const setDeleteUserData = useCallback(async (endpoint, payload = {}) => {
		const VALID_ENDPOINTS = Object.keys(DEFAULT_NETWORK_QUEUE.delete);
		const key = endpoint.split("/")[1];
		if (VALID_ENDPOINTS.includes(key) === false) return;

		const id = endpoint.split("/")[2];
		if (id) payload[key + "s"] = [{ id }];
		setStorageNetworkQueue((prevNetworkQueue) => ({
			...prevNetworkQueue,
			delete: {
				...prevNetworkQueue.delete,
				[key]: addOrMergeObjectProperties(
					prevNetworkQueue.delete[key],
					payload,
				),
			},
		}));
	}, []);

	const setPostUserData = useCallback((endpoint, payload) => {
		const key = endpoint.split("/")[1];
		const VALID_ENDPOINTS = Object.keys(DEFAULT_NETWORK_QUEUE.post);
		if (VALID_ENDPOINTS.includes(key) === false) return;

		setStorageNetworkQueue((prevNetworkQueue) => ({
			...prevNetworkQueue,
			post: {
				...prevNetworkQueue.post,
				[key]: addOrMergeObjectProperties(
					prevNetworkQueue.post[key],
					payload.data,
				),
			},
		}));
	}, []);

	return { setDeleteUserData, setPostUserData };
};
