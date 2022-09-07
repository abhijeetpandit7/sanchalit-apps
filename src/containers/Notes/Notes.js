import React, { memo } from "react";
import { useUserCustomization } from "../../hooks";

const ContextMemo = memo(() => {
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
	const { storageUserCustomization } = useUserCustomization();
	const { notesVisible } = storageUserCustomization;

	return <>{notesVisible && <ContextMemo />}</>;
};
