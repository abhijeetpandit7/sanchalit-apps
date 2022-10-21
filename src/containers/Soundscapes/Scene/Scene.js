import React from "react";
import Tile from "./Tile/Tile";

export const Scene = (props) => (
	<div className="view scene" data-v-1d87a849 data-v-74bd37f6 data-v-0f8972b1>
		{props.children}
		<section className="tracks tracks" data-v-6038c89b data-v-1d87a849>
			<div className="tile-list" data-v-6038c89b>
				{props.scene.tracks.map((track) => (
					<Tile {...{ track }} key={track.name} />
				))}
			</div>
		</section>
	</div>
);
