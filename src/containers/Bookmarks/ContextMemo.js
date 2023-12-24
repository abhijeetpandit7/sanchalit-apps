import React, { memo, useEffect, useRef, useState } from "react";
import { BookmarksItem, Folder, MostVisited } from "../Bookmarks";
import {
	BOOKMARKS,
	parseBookmarksList,
	parseBookmarksOverflow,
} from "../../utils";

const ContextMemo = memo(
	({ bookmarks, bookmarksSettings, topSites, setWidgetReady }) => {
		const bookmarksListRef = useRef(null);
		const [bookmarksList, setBookmarksList] = useState(bookmarks);

		const { iconsOnly, openInNewTab, defaultMostVisited } = bookmarksSettings;

		const [mostVisitedView, setMostVisitedView] = useState(defaultMostVisited);

		useEffect(
			() => setMostVisitedView(defaultMostVisited),
			[defaultMostVisited],
		);

		useEffect(() => {
			(async () => {
				const parsedBookmarksList = parseBookmarksList(
					bookmarks,
					bookmarksSettings,
					mostVisitedView && defaultMostVisited,
					topSites,
				);
				await setBookmarksList(parsedBookmarksList);
				await setBookmarksList(
					parseBookmarksOverflow(
						parsedBookmarksList,
						mostVisitedView && defaultMostVisited,
						bookmarksListRef,
					),
				);
				setWidgetReady({ widget: BOOKMARKS });
			})();
		}, [bookmarksSettings, mostVisitedView]);

		const toggleMostVisitedView = () =>
			setMostVisitedView((prevValue) => !prevValue);

		return (
			<div
				id="bookmarks-vue"
				className="app-container bookmarks"
				data-v-10674610
			>
				<ul className="bookmarks-list" ref={bookmarksListRef} data-v-10674610>
					{mostVisitedView ? (
						<MostVisited
							{...{
								bookmarksList,
								iconsOnly,
								openInNewTab,
								toggleMostVisitedView,
							}}
						/>
					) : (
						bookmarksList.map((bookmark) =>
							bookmark.children ? (
								<Folder
									key={bookmark.id}
									{...{ bookmark, iconsOnly, openInNewTab }}
								/>
							) : (
								<BookmarksItem
									key={bookmark.id}
									{...{ bookmark, iconsOnly, openInNewTab }}
								/>
							),
						)
					)}
				</ul>
			</div>
		);
	},
);

export default ContextMemo;
