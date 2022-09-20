import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const GreetingMantra = () => {
	const {
		displayNameRef,
		storageUserCustomization: {
			displayName,
			displayNameVisible,
			greetingVisible,
		},
	} = useUserCustomization();
	const { editDisplayName, setWidgetReady } = useUserActions();

	return (
		<>
			{greetingVisible && (
				<Suspense fallback={null}>
					<ContextMemo
						{...{
							displayName,
							displayNameVisible,
							displayNameRef,
							editDisplayName,
							setWidgetReady,
						}}
					/>
				</Suspense>
			)}
		</>
	);
};
