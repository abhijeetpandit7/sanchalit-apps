import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Clock = () => {
	const {
		storageUserCustomization: { clockVisible, hour12clock },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{clockVisible && (
				<Suspense fallback={null}>
					<ContextMemo {...{ hour12clock, setWidgetReady }} />
				</Suspense>
			)}
		</>
	);
};
