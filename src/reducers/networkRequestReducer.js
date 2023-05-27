import { isObjectEmpty, addOrMergeObjectProperties } from "../utils";

export const networkRequestReducer = (state, action) => {
	switch (action.type) {
		case "RESET_PAYLOAD": {
			return {
				...state,
				payload: {},
			};
		}

		case "SET_PAYLOAD": {
			const { data } = action.payload;
			return {
				...state,
				payload: isObjectEmpty(state.payload)
					? data
					: addOrMergeObjectProperties(state.payload, data),
			};
		}

		default:
			return state;
	}
};
