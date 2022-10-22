import React, { memo, useState } from "react";
import { Home, Player, Scene } from "../Soundscapes";

const ContextMemo = memo(() => {
	const [isHome, setIsHome] = useState(true);
	const [play, setPlay] = useState(true);
	const [scene, setScene] = useState(false);
	const [playerVolume, setPlayerVolume] = useState(50);

	const backClickHandler = () => setIsHome(true);

	const sceneClickHandler = (scene) => {
		setScene(scene);
		setPlay(true);
		setIsHome(false);
	};

	// TODO: Add slide-down & slide-left animation
	// TODO: Fix random & custom
	return (
		<div className="app popup nipple nipple-top-left" data-v-74bd37f6>
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
