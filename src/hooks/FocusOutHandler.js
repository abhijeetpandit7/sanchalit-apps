import { useEffect } from "react";
import { hideAppPopup } from "../utils";

export const FocusOutHandler = ({
	ref,
	callback = hideAppPopup,
	classNames = [],
} = {}) => {
	useEffect(() => {
		const onFocusOutHandler = (event) => {
			if (ref.current && !ref.current.contains(event.target))
				callback(ref, classNames);
		};
		document.addEventListener("mousedown", onFocusOutHandler);

		return () => document.removeEventListener("mousedown", onFocusOutHandler);
	}, []);
};
