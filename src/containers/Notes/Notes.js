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
	NIPPLE,
	NIPPLE_BOTTOM_RIGHT,
	NOTES,
	UPSELL_PLUS_GATE,
	toggleAppPopup,
} from "../../utils";

const App = lazy(() => import("./App"));

const Loading = () => (
	<div className="app notes-app">
		<div className="app-loading" data-v-d1d2d8c8>
			Loading… <div className="loading-icon"></div>
		</div>
	</div>
);

const ContextMemo = memo(
	({ hasPlus, hideTodoApp, setUpsellApp, setWidgetReady }) => {
		const appWrapperRef = useRef(null);
		const notesRef = useRef(null);
		const notesToggleAppRef = useRef(null);
		const [componentDidMount, setComponentDidMount] = useState(false);

		useEffect(() => setWidgetReady({ widget: NOTES }), []);

		FocusOutHandler({ ref: notesRef });

		const toggleNotesApp = () => {
			hideTodoApp();
			toggleAppPopup(notesRef);
			setComponentDidMount(true);
		};

		const handleClick = () => {
			if (hasPlus) {
				toggleNotesApp();
			} else {
				setUpsellApp(UPSELL_PLUS_GATE);
			}
		};

		return (
			<div id="notes" className="app-container notes" ref={notesRef}>
				<div
					className={`app-wrapper app-placeholder ${NIPPLE} ${NIPPLE_BOTTOM_RIGHT}`}
					ref={appWrapperRef}
				>
					{componentDidMount && (
						<Suspense fallback={<Loading />}>
							<App {...{ notesRef, notesToggleAppRef, appWrapperRef }} />
						</Suspense>
					)}
				</div>
				<span
					className="app-dash toggle Notes-toggle"
					ref={notesToggleAppRef}
					onClick={handleClick}
					data-v-383d39c5
				>
					Notes
				</span>
			</div>
		);
	},
);

export const Notes = () => {
	const {
		storageAuth: { subscriptionSummary },
	} = useAuth();
	const {
		storageUserCustomization: { notesVisible },
	} = useUserCustomization();
	const { hideTodoApp, setUpsellApp, setWidgetReady } = useUserActions();
	const hasPlus = !!subscriptionSummary?.plan;
	const shouldRender = notesVisible || hasPlus === false;

	return (
		<>
			{shouldRender && (
				<ContextMemo
					{...{ hasPlus, hideTodoApp, setUpsellApp, setWidgetReady }}
				/>
			)}
		</>
	);
};
