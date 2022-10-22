import React, { useEffect, useRef, useState } from "react";

export const VolumeController = ({
	play,
	track,
	playerVolume,
	setPlayerVolume,
}) => {
	const sliderRef = useRef(null);
	const titleRef = useRef(null);

	const [isMouseDown, setIsMouseDown] = useState(false);

	useEffect(() => {
		[sliderRef, titleRef].forEach((ref) =>
			ref.current.setAttribute(
				track ? "data-v-2b1ea728" : "data-v-1d87a849",
				"",
			),
		);
	}, []);

	const volumeSlideHandler = (event, onClick) => {
		if (isMouseDown || onClick) {
			const newVolume = Math.round(
				((event.clientX - sliderRef.current.offsetLeft) * 100) /
					sliderRef.current.offsetWidth,
			);
			setPlayerVolume(newVolume);
		}
	};

	return (
		<div
			className={track ? `tile-slider ${play ? "on" : ""}` : "volume"}
			title={`${
				track
					? `${track.name} volume: ${playerVolume}`
					: `Volume: ${playerVolume}`
			}`}
			ref={titleRef}
		>
			<div
				className="slider"
				ref={sliderRef}
				onMouseDown={() => setIsMouseDown(true)}
				onMouseUp={() => setIsMouseDown(false)}
				onMouseMove={volumeSlideHandler}
				onClick={(event) => volumeSlideHandler(event, true)}
				data-v-14a0b4e3
			>
				<div className="bar off" data-v-14a0b4e3></div>
				<div
					className="bar on"
					style={{ width: `${playerVolume}%` }}
					data-v-14a0b4e3
				></div>
				<div
					className="dial"
					style={{ left: `${playerVolume}%` }}
					data-v-14a0b4e3
				></div>
			</div>
		</div>
	);
};
