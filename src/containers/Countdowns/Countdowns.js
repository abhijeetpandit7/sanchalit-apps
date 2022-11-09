import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "./../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Countdowns = () => {
	const {
		storageUserCustomization: { countdownVisible, countdowns },
	} = useUserCustomization();
	const { setDashAppStyles, setWidgetReady } = useUserActions();

	return (
		<div className="metric-type" data-v-f48f9f48>
			<Suspense fallback={null}>
				{countdownVisible && (
					<ContextMemo {...{ countdowns, setDashAppStyles, setWidgetReady }} />
				)}
			</Suspense>
		</div>
	);
};
