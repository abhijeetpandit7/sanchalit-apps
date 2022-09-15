export const widgetReducer = (state, action) => {
	switch (action.type) {
		case "SET_READY": {
			const { widget, type } = action.payload;
			return {
				...state,
				[type]: {
					...state[type],
					[widget]: {
						...state[type][widget],
						ready: true,
					},
				},
			};
		}

		default:
			return state;
	}
};
