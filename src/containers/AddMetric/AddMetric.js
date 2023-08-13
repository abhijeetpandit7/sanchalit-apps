import React, { lazy, Suspense } from "react";
import { useAuth, useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const AddMetric = () => {
	const {
		storageAuth: { subscriptionSummary },
	} = useAuth();
	const { setDashApp, setDashAppStyles } = useUserActions();
	const {
		countdownsRef,
		dashAppRef,
		storageUserCustomization: { countdownVisible },
		widgetManager,
	} = useUserCustomization();

	const { app } = widgetManager.dashApp;
	const hasPlus = !!subscriptionSummary?.plan;
	const shouldRender = countdownVisible || hasPlus === false;

	return (
		<>
			{shouldRender && (
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
