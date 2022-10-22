import React, { useState } from "react";
import { VolumeController } from "../../../../components";

const Tile = ({ track }) => {
	const [play, setPlay] = useState(true);

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
			<VolumeController {...{ play, track }} />
		</div>
	);
};

export default Tile;
