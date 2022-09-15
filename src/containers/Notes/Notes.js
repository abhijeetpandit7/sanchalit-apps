import React, { memo, useEffect } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";
import { NOTES } from "../../utils";

const ContextMemo = memo(({ setWidgetReady }) => {
	useEffect(() => setWidgetReady({ widget: NOTES }), []);

	return (
		<div id="notes" className="app-container notes">
			<div className="app-wrapper app-placeholder nipple nipple-bottom-right">
				<div className="app " style={{ height: "520px", width: "750px" }}>
					<div className="app-placeholder-loading">
						<i className="loading-icon"></i>Loading...
					</div>
				</div>
				<div className="touch-overlay"></div>
			</div>
			<span className="app-dash toggle Notes-toggle">Notes</span>
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
