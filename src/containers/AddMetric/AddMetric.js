import React, { lazy, Suspense } from "react";
import { useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const AddMetric = () => {
	// TODO: Show if not plus user
	const {
		storageUserCustomization: { countdownVisible },
	} = useUserCustomization();

	return (
		<>
			{countdownVisible && (
				<Suspense fallback={null}>
					<ContextMemo />
				</Suspense>
			)}
		</>
	);
};
