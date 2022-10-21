import React, { memo, useState } from "react";
import { Home, Player, Scene } from "../Soundscapes";

const ContextMemo = memo(() => {
	const [isHome, setIsHome] = useState(true);
	const [scene, setScene] = useState(false);

	const backClickHandler = () => setIsHome(true);

	const sceneClickHandler = (scene) => {
		setScene(scene);
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
						<Scene {...{ scene }}>
							<Player {...{ scene, backClickHandler }} />
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
