import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Notes = () => {
	const {
		storageUserCustomization: { notesVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{notesVisible && (
				<Suspense fallback={null}>
					<ContextMemo {...{ setWidgetReady }} />
				</Suspense>
			)}
		</>
	);
};
