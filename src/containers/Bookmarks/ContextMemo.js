import React, { memo, useEffect, useRef, useState } from "react";
import { BookmarksItem, Folder } from "../Bookmarks";
import {
	BOOKMARKS,
	parseBookmarksList,
	parseBookmarksOverflow,
} from "../../utils";

const ContextMemo = memo(
	({ bookmarks, bookmarksSettings, topSites, setWidgetReady }) => {
		const bookmarksListRef = useRef(null);
		const [bookmarksList, setBookmarksList] = useState(bookmarks);

		const {
			iconsOnly,
			openInNewTab,
			includeOtherBookmarks,
			includeBookmarksManager,
			includeMostVisited,
		} = bookmarksSettings;

		useEffect(async () => {
			const parsedBookmarksList = parseBookmarksList(
				bookmarks,
				bookmarksSettings,
				topSites,
			);
			await setBookmarksList(parsedBookmarksList);
			await setBookmarksList(
				parseBookmarksOverflow(parsedBookmarksList, bookmarksListRef),
			);
			setWidgetReady({ widget: BOOKMARKS });
		}, [
			iconsOnly,
			includeOtherBookmarks,
			includeBookmarksManager,
			includeMostVisited,
		]);

		return (
			<div
				id="bookmarks-vue"
				className="app-container bookmarks"
				data-v-10674610
			>
				<ul className="bookmarks-list" ref={bookmarksListRef} data-v-10674610>
					{bookmarksList.map((bookmark) =>
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
					)}
				</ul>
			</div>
		);
	},
);

export default ContextMemo;
