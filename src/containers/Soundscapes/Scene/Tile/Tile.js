import React, { useEffect, useRef, useState } from "react";
import { VolumeController } from "../../../../components";

const Tile = ({ track, controllerVolume, controllerPlay }) => {
	const audioElement = useRef(new Audio());
	const audio = audioElement.current;

	const [play, setPlay] = useState(true);
	const [playerVolume, setPlayerVolume] = useState(track.volume);

	useEffect(() => {
		audio.src = track.url;
		audio.loop = true;
	}, []);

	useEffect(() => {
		controllerPlay && play ? audio.play() : audio.pause();
		return () => audio.pause();
	}, [controllerPlay, play]);

	useEffect(
		() => (audio.volume = ((playerVolume / 100) * controllerVolume) / 100),
		[controllerVolume, playerVolume],
	);

	return (
		<div
			title={`Turn ${play ? "off" : "on"} ${track.name}`}
			data-v-2b1ea728
			data-v-6038c89b
		>
			<div
				className={`tile ${play ? "on" : ""}`}
				onClick={() => setPlay((prevVal) => !prevVal)}
				data-v-2b1ea728
			>
				<div className="tile-icon-wrapper" data-v-2b1ea728>
					{track.icon}
				</div>
			</div>
			<VolumeController {...{ play, playerVolume, track, setPlayerVolume }} />
		</div>
	);
};

export default Tile;
