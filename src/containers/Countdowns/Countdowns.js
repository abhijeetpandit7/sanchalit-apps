import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "./../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Countdowns = () => {
	const {
		countdownsRef,
		storageUserCustomization: { countdownVisible, countdowns },
	} = useUserCustomization();
	const {
		setCurrentCountdownId,
		setDashApp,
		setDashAppStyles,
		setWidgetReady,
	} = useUserActions();

	return (
		<div className="metric-type" ref={countdownsRef} data-v-f48f9f48>
			<Suspense fallback={null}>
				{countdownVisible && (
					<ContextMemo
						{...{
							countdowns,
							setCurrentCountdownId,
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
