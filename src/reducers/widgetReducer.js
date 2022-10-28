export const widgetReducer = (state, action) => {
	switch (action.type) {
		case "SET_DASH_APP": {
			const { app } = action.payload;
			return {
				...state,
				dashApp: {
					...state.dashApp,
					app: app,
				},
			};
		}

		case "SET_DASH_APP_STYLES": {
			const { styles } = action.payload;
			return {
				...state,
				dashApp: {
					...state.dashApp,
					styles: { ...state.dashApp.styles, ...styles },
				},
			};
		}

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
