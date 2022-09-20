import React, { lazy, Suspense } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";
import {
	bingBase64Source,
	duckDuckGoBase64Source,
	ecosiaBase64Source,
	googleBase64Source,
} from "../../utils";

const CenterContextMemo = lazy(() => import("./CenterContextMemo"));
const TopContextMemo = lazy(() => import("./TopContextMemo"));

export const Search = ({ topRow }) => {
	const {
		searchInputRef,
		storageUserCustomization: { searchVisible, searchSettings },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{searchVisible &&
				(topRow
					? searchSettings.inCenter === false && (
							<Suspense fallback={null}>
								<TopContextMemo
									{...{
										bingBase64Source,
										duckDuckGoBase64Source,
										ecosiaBase64Source,
										googleBase64Source,
										searchInputRef,
										provider: searchSettings.provider,
										setWidgetReady,
									}}
								/>
							</Suspense>
					  )
					: searchSettings.inCenter && (
							<Suspense fallback={null}>
								<CenterContextMemo
									{...{
										bingBase64Source,
										duckDuckGoBase64Source,
										ecosiaBase64Source,
										googleBase64Source,
										searchInputRef,
										provider: searchSettings.provider,
										setWidgetReady,
									}}
								/>
							</Suspense>
					  ))}
		</>
	);
};
