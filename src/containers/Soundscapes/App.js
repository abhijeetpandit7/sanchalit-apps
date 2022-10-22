import React, { memo, useState } from "react";
import { Home, Player, Scene } from "../Soundscapes";
import {
	RANDOM,
	CUSTOM,
	SOUNDSCAPES_SCENE_LIST,
	getRandomIntBetween,
	randomElement,
} from "../../utils";

const ContextMemo = memo(() => {
	const [isHome, setIsHome] = useState(true);
	const [play, setPlay] = useState(true);
	const [scene, setScene] = useState(false);
	const [playerVolume, setPlayerVolume] = useState(50);

	const backClickHandler = () => setIsHome(true);

	const sceneClickHandler = (scene) => {
		const { name } = scene;
		if (name === CUSTOM) {
			scene.tracks.map((track) => (track.enable = false));
			const randomTracks = scene.tracks
				.map((track) => ({ sort: Math.random(), value: track }))
				.sort((a, b) => a.sort - b.sort)
				.map((track) => track.value)
				.slice(0, 3);
			randomTracks.map((track) => {
				track.enable = true;
				track.volume = getRandomIntBetween(15, 85);
			});
		} else if (name === RANDOM) {
			scene = randomElement(
				SOUNDSCAPES_SCENE_LIST.filter(
					({ name }) => name !== CUSTOM && name !== RANDOM,
				),
			);
		}
		setScene(scene);
		setPlay(true);
		setIsHome(false);
	};

	// TODO: Add slide-down & slide-left animation
	// TODO: Add icon change, play || pause actions
	// TODO: In random, next button
	return (
		<div
			className="app app-wrapper popup nipple nipple-top-left"
			data-v-74bd37f6
		>
			<div className="resize-wrapper tr-height" data-v-0f8972b1 data-v-74bd37f6>
				<div data-v-0f8972b1>
					{isHome ? (
						<Home {...{ sceneClickHandler }} />
					) : (
						<Scene {...{ play, playerVolume, scene }}>
							<Player
								{...{
									play,
									playerVolume,
									scene,
									backClickHandler,
									setPlay,
									setPlayerVolume,
								}}
							/>
						</Scene>
					)}
				</div>
			</div>
		</div>
	);
});

const App = () => {
	return <ContextMemo />;
};

export default App;
