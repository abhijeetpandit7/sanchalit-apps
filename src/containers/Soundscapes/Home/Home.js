import React from "react";
import { SOUNDSCAPES_SCENE_LIST } from "../../../utils";

export const Home = (props) => (
	<section
		className="view home"
		data-v-d1cdfc0c
		data-v-74bd37f6
		data-v-0f8972b1
	>
		<header className="header" data-v-d1cdfc0c>
			<div className="heading" data-v-d1cdfc0c>
				Soundscapes
			</div>
		</header>

		<div className="tile-list scenes" data-v-d1cdfc0c>
			{SOUNDSCAPES_SCENE_LIST.map((scene) => (
				<div
					className="tile scene"
					data-v-d1cdfc0c
					key={scene.name}
					onClick={() => props.sceneClickHandler(scene)}
				>
					{scene.icon}
					<span className="tile-title" data-v-d1cdfc0c>
						{scene.name}
					</span>
				</div>
			))}
		</div>
	</section>
);
