import React, { memo, useEffect } from "react";
import { BookmarksItem, Folder } from "../Bookmarks";
import { useUserActions, useUserCustomization } from "../../hooks";
import { BOOKMARKS } from "../../utils";

const ContextMemo = memo(({ bookmarks, setWidgetReady }) => {
	useEffect(() => setWidgetReady({ widget: BOOKMARKS }), []);

	return (
		<div id="bookmarks-vue" className="app-container bookmarks" data-v-10674610>
			<ul className="bookmarks-list" data-v-10674610>
				{bookmarks.map((bookmark) =>
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
