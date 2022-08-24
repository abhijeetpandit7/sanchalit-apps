import { useEffect } from "react";
import { hideAppPopup } from "../utils";

export const FocusOutHandler = ({ ref, callback = hideAppPopup } = {}) => {
	useEffect(() => {
		const onFocusOutHandler = (event) => {
			if (ref.current && !ref.current.contains(event.target)) callback(ref);
		};
		document.addEventListener("mousedown", onFocusOutHandler);

		return () => document.removeEventListener("mousedown", onFocusOutHandler);
	}, []);
};
