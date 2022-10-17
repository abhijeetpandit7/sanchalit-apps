import React, {
	lazy,
	memo,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	FocusOutHandler,
	useUserActions,
	useUserCustomization,
} from "../../hooks";
import { SOUNDSCAPES, soundWaveIcon, toggleAppPopup } from "../../utils";

const Loading = () => (
	<div className="app">
		<div className="app-placeholder-loading">
			<i className="loading-icon"></i>Loading...
		</div>
	</div>
);

const App = lazy(() => import("./App"));

const ContextMemo = memo(({ setWidgetReady }) => {
	const soundscapesRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => setWidgetReady({ widget: SOUNDSCAPES }), []);

	FocusOutHandler({ ref: soundscapesRef });

	const toggleSoundscapesApp = () => {
		toggleAppPopup(soundscapesRef);
		setComponentDidMount(true);
	};

	return (
		<div
			id="soundscapes"
			className="app-container soundscapes"
			ref={soundscapesRef}
		>
			<div className="app-wrapper app-placeholder">
				{componentDidMount && (
					<Suspense fallback={<Loading />}>
						<App />
					</Suspense>
				)}
			</div>
			<div
				className="app-dash app-dash-icon add-shadow -toggle toggle"
				onClick={toggleSoundscapesApp}
			>
				{soundWaveIcon}
				<span className="app-dash-icon-label"></span>
			</div>
		</div>
	);
});

export const Soundscapes = () => {
	const {
		storageUserCustomization: { soundscapesVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return <>{soundscapesVisible && <ContextMemo {...{ setWidgetReady }} />}</>;
};
