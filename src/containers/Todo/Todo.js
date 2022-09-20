import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Todo = () => {
	const {
		storageUserCustomization: { todoVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{todoVisible && (
				<Suspense fallback={null}>
					<ContextMemo {...{ setWidgetReady }} />
				</Suspense>
			)}
		</>
	);
};
