import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "./../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Countdowns = () => {
	const {
		countdownsRef,
		storageUserCustomization: {
			countdownVisible,
			countdowns,
			showRandomMetricCountdown,
		},
	} = useUserCustomization();
	const { setDashApp, setDashAppStyles, setWidgetReady } = useUserActions();

	return (
		<div className="metric-type" ref={countdownsRef} data-v-f48f9f48>
			<Suspense fallback={null}>
				{countdownVisible && (
					<ContextMemo
						{...{
							countdowns,
							showRandomMetricCountdown,
							setDashApp,
							setDashAppStyles,
							setWidgetReady,
						}}
					/>
				)}
			</Suspense>
		</div>
	);
};
