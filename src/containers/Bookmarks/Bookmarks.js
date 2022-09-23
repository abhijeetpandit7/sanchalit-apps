import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Bookmarks = () => {
	const {
		storageUserCustomization: {
			bookmarks,
			bookmarksVisible,
			bookmarksSettings,
			topSites,
		},
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{bookmarksVisible && (
				<Suspense fallback={null}>
					<ContextMemo
						{...{ bookmarks, bookmarksSettings, topSites, setWidgetReady }}
					/>
				</Suspense>
			)}
		</>
	);
};
