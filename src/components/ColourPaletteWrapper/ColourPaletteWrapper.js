import React, { useRef, useState } from "react";
import { FocusOutHandler } from "../../hooks";
import {
	checkIcon,
	ACTIVE,
	TRANSPARENT_COLOUR,
	COLOUR_PALETTE_LIST,
	hideRefClassName,
	toggleRefClassNames,
	trimSpacesWithin,
} from "../../utils";

const isTransparentColour = (colour) =>
	trimSpacesWithin(colour) === trimSpacesWithin(TRANSPARENT_COLOUR);

export const ColourPaletteWrapper = ({ todoListColour }) => {
	const swatchRef = useRef(null);
	const [isFocus, setIsFocus] = useState(false);

	FocusOutHandler({
		ref: swatchRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
		setIsFocus,
	});

	const toggleSwatch = () => {
		toggleRefClassNames(swatchRef, [ACTIVE]);
		setIsFocus(swatchRef.current.classList.contains(ACTIVE));
	};

	const ColourPicker = () => (
		<ul className="nipple nipple-bottom-left swatch-color-picker todo-color-picker">
			{COLOUR_PALETTE_LIST.map((colour, index) => (
				<li
					style={{ backgroundColor: colour }}
					className={`${isTransparentColour(colour) ? "no-color" : ""} ${
						trimSpacesWithin(colour) === trimSpacesWithin(todoListColour)
							? "active"
							: ""
					}`}
					key={index}
				>
					{checkIcon}
				</li>
			))}
		</ul>
	);

	return (
		<ul className="color-palette-wrapper" ref={swatchRef}>
			<div className="swatch-container" onClick={toggleSwatch}>
				<div
					className={`swatch ${
						isTransparentColour(todoListColour) ? "null-color" : ""
					}`}
					style={{ backgroundColor: todoListColour }}
				></div>
			</div>
			{isFocus && <ColourPicker />}
		</ul>
	);
};
