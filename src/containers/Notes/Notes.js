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
import { NOTES, toggleAppPopup } from "../../utils";

const App = lazy(() => import("./App"));

const ContextMemo = memo(({ setWidgetReady }) => {
	const notesRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => setWidgetReady({ widget: NOTES }), []);

	FocusOutHandler({ ref: notesRef });

	const toggleNotesApp = () => {
		toggleAppPopup(notesRef);
		setComponentDidMount(true);
	};

	return (
		<div id="notes" className="app-container notes" ref={notesRef}>
			<div className="app-wrapper app-placeholder nipple nipple-bottom-right">
				{componentDidMount && (
					<Suspense fallback={null}>
						<App />
					</Suspense>
				)}
			</div>
			<span className="app-dash toggle Notes-toggle" onClick={toggleNotesApp}>
				Notes
			</span>
		</div>
	);
});

export const Notes = () => {
	const {
		storageUserCustomization: { notesVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return <>{notesVisible && <ContextMemo {...{ setWidgetReady }} />}</>;
};
