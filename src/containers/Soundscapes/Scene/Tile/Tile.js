import React from "react";

const Tile = ({ track }) => {
	return (
		// TODO: turn on/off
		// TODO: tile-slider ? on : ""
		<div title={`Turn off ${track.name}`} data-v-2b1ea728 data-v-6038c89b>
			<div className="tile on" data-v-2b1ea728>
				<div className="tile-icon-wrapper" data-v-2b1ea728>
					{track.icon}
				</div>
			</div>
			<div
				className="tile-slider on"
				title={`${track.name} volume: ${track.volume}`}
				data-v-2b1ea728
			>
				<div className="slider" data-v-14a0b4e3 data-v-2b1ea728>
					<div className="bar off" data-v-14a0b4e3></div>
					<div
						className="bar on"
						style={{ width: `${track.volume}%` }}
						data-v-14a0b4e3
					></div>
					<div
						className="dial"
						style={{ left: `${track.volume}%` }}
						data-v-14a0b4e3
					></div>
				</div>
			</div>
		</div>
	);
};

export default Tile;
