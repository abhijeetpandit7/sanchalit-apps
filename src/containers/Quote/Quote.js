import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Quote = () => {
	const {
		storageUserCustomization: { quotesVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{quotesVisible && (
				<Suspense fallback={null}>
					<ContextMemo {...{ setWidgetReady }} />
				</Suspense>
			)}
		</>
	);
};
