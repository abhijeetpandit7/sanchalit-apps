import React, { lazy, Suspense } from "react";
import { useUserCustomization } from "../../hooks";
import { DASH } from "../../utils";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const DashLinks = () => {
	const {
		storageUserCustomization: { bookmarksSettings },
	} = useUserCustomization();

	const appsLocation = bookmarksSettings?.appsLocation;
	const homeTabLocation = bookmarksSettings?.homeTabLocation;
	const openInNewTab = bookmarksSettings?.openInNewTab;

	const showApps = appsLocation === DASH;
	const showHomeTab = homeTabLocation === DASH;

	return (
		<>
			{(showApps || showHomeTab) && (
				<Suspense fallback={null}>
					<ContextMemo
						{...{
							showApps,
							showHomeTab,
							openInNewTab,
						}}
					/>
				</Suspense>
			)}
		</>
	);
};
