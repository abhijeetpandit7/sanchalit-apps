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

export const ColourPaletteWrapper = ({
	todoListColour,
	todoListId,
	setTodoListColour,
}) => {
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
			{COLOUR_PALETTE_LIST.map((paletteColour, index) => (
				<li
					style={{ backgroundColor: paletteColour }}
					className={`${isTransparentColour(paletteColour) ? "no-color" : ""} ${
						trimSpacesWithin(paletteColour) === trimSpacesWithin(todoListColour)
							? "active"
							: ""
					}`}
					onClick={() => {
						setTodoListColour(todoListId, paletteColour);
						toggleSwatch();
					}}
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
					style={{ background: todoListColour }}
				></div>
			</div>
			{isFocus && <ColourPicker {...{ setTodoListColour }} />}
		</ul>
	);
};
