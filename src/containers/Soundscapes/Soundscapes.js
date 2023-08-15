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
	useAuth,
	useUserActions,
	useUserCustomization,
} from "../../hooks";
import {
	SOUNDSCAPES,
	UPSELL_PLUS_GATE,
	soundWaveIcon,
	toggleAppPopup,
} from "../../utils";

const Loading = () => (
	<div className="app-wrapper app-placeholder">
		<div className="app">
			<div className="app-placeholder-loading">
				<i className="loading-icon"></i>Loading...
			</div>
		</div>
	</div>
);

const App = lazy(() => import("./App"));

const ContextMemo = memo(({ hasPlus, setWidgetReady, setUpsellApp }) => {
	const soundscapesRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => setWidgetReady({ widget: SOUNDSCAPES }), []);

	FocusOutHandler({ ref: soundscapesRef });

	const toggleSoundscapesApp = () => {
		toggleAppPopup(soundscapesRef);
		setComponentDidMount(true);
	};

	const handleClick = () => {
		if (hasPlus) {
			toggleSoundscapesApp();
		} else {
			setUpsellApp(UPSELL_PLUS_GATE);
		}
	};

	return (
		<div
			id="soundscapes"
			className="app-container soundscapes"
			ref={soundscapesRef}
		>
			<div
				className="app-dash app-dash-icon add-shadow -toggle toggle"
				onClick={handleClick}
			>
				{soundWaveIcon}
				<span className="app-dash-icon-label"></span>
			</div>
			{componentDidMount && (
				<Suspense fallback={<Loading />}>
					<App />
				</Suspense>
			)}
		</div>
	);
});

export const Soundscapes = () => {
	const {
		storageAuth: { subscriptionSummary },
	} = useAuth();
	const {
		storageUserCustomization: { soundscapesVisible },
	} = useUserCustomization();
	const { setUpsellApp, setWidgetReady } = useUserActions();
	const hasPlus = !!subscriptionSummary?.plan;
	const shouldRender = soundscapesVisible || hasPlus === false;

	return (
		<>
			{shouldRender && (
				<ContextMemo {...{ hasPlus, setWidgetReady, setUpsellApp }} />
			)}
		</>
	);
};
