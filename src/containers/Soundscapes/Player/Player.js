import React, { useEffect, useRef } from "react";
import { backIcon1, pauseIcon, toPlayerIcon } from "../../../utils";

export const Player = ({ scene, backClickHandler }) => {
	const spanIconRef = useRef(null);

	useEffect(() => {
		const icon = spanIconRef.current.querySelector("svg");
		toPlayerIcon(icon);
	}, []);

	// TODO: Play/ Pause icon conditionally
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
					title="Pause"
					data-v-391f1319
					data-v-1d87a849
				>
					{pauseIcon}
				</span>
				<div className="volume" title="Volume: 50" data-v-1d87a849>
					<div className="slider" data-v-14a0b4e3 data-v-1d87a849>
						<div className="bar off" data-v-14a0b4e3></div>
						<div
							className="bar on"
							style={{ width: "50%" }}
							data-v-14a0b4e3
						></div>
						<div className="dial" style={{ left: "50%" }} data-v-14a0b4e3></div>
					</div>
				</div>
			</div>
		</div>
	);
};
