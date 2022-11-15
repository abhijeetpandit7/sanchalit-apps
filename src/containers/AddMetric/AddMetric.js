import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const AddMetric = () => {
	const { setDashApp, setDashAppStyles } = useUserActions();
	// TODO: Show if not plus user
	const {
		countdownsRef,
		dashAppRef,
		storageUserCustomization: { countdownVisible },
		widgetManager,
	} = useUserCustomization();

	const { app } = widgetManager.dashApp;

	return (
		<>
			{countdownVisible && (
				<Suspense fallback={null}>
					<ContextMemo
						{...{
							countdownsRef,
							dashAppRef,
							app,
							setDashApp,
							setDashAppStyles,
						}}
					/>
				</Suspense>
			)}
		</>
	);
};
