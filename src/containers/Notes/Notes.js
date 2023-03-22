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
import {
	NIPPLE,
	NIPPLE_BOTTOM_RIGHT,
	NOTES,
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

const ContextMemo = memo(({ hideTodoApp, setWidgetReady }) => {
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
				onClick={toggleNotesApp}
				data-v-383d39c5
			>
				Notes
			</span>
		</div>
	);
});

export const Notes = () => {
	const {
		storageUserCustomization: { notesVisible },
	} = useUserCustomization();
	const { hideTodoApp, setWidgetReady } = useUserActions();

	return (
		<>{notesVisible && <ContextMemo {...{ hideTodoApp, setWidgetReady }} />}</>
	);
};
