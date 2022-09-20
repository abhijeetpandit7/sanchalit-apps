import React, { memo, useEffect, useRef, useState } from "react";
import { BookmarksItem, Folder } from "../Bookmarks";
import { useUserActions, useUserCustomization } from "../../hooks";
import { BOOKMARKS, parseBookmarksListOverflow } from "../../utils";

const ContextMemo = memo(({ bookmarks, setWidgetReady }) => {
	const bookmarksListRef = useRef(null);
	const [bookmarksList, setBookmarksList] = useState(bookmarks);

	useEffect(() => {
		setBookmarksList(
			parseBookmarksListOverflow(bookmarksList, bookmarksListRef),
		);
		setWidgetReady({ widget: BOOKMARKS });
	}, []);

	return (
		<div id="bookmarks-vue" className="app-container bookmarks" data-v-10674610>
			<ul className="bookmarks-list" ref={bookmarksListRef} data-v-10674610>
				{bookmarksList.map((bookmark) =>
					bookmark.children ? (
						<Folder key={bookmark.id} {...bookmark} />
					) : (
						<BookmarksItem key={bookmark.id} {...bookmark} />
					),
				)}
			</ul>
		</div>
	);
});

export const Bookmarks = () => {
	const {
		storageUserCustomization: { bookmarks, bookmarksVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{bookmarksVisible && <ContextMemo {...{ bookmarks, setWidgetReady }} />}
		</>
	);
};
