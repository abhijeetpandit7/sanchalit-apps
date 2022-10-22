import React, { useEffect, useRef, useState } from "react";
import { VolumeController } from "../../../components";
import { backIcon1, pauseIcon, playIcon, toPlayerIcon } from "../../../utils";

export const Player = ({
	playerVolume,
	scene,
	backClickHandler,
	setPlayerVolume,
}) => {
	const spanIconRef = useRef(null);
	const [play, setPlay] = useState(true);

	useEffect(() => {
		const icon = spanIconRef.current.querySelector("svg");
		toPlayerIcon(icon);
	}, []);

	return (
		<div className="player" data-v-1d87a849>
			<div className="player-wrapper" data-v-1d87a849>
				<div
					className="back control icon-wrapper"
					title="Back to Soundscapes"
					data-v-1d87a849
					onClick={backClickHandler}
				>
					{backIcon1}
				</div>
				<span ref={spanIconRef}>{scene.icon}</span>
				<div className={`player-title ${scene.name}`} data-v-1d87a849>
					{scene.name}
				</div>
				<span
					className="play control"
					title={play ? "Pause" : "Play"}
					data-v-391f1319
					data-v-1d87a849
					onClick={() => setPlay((prevVal) => !prevVal)}
				>
					{play ? pauseIcon : playIcon}
				</span>
				<VolumeController {...{ playerVolume, setPlayerVolume }} />
			</div>
		</div>
	);
};
