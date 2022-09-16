import React, { memo, useEffect } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";
import { BOOKMARKS, folderIcon } from "../../utils";

const FolderBookmark = ({ title, url }) => (
	<li className="dropdown-item" data-v-5504764e>
		<a
			className="bookmark bookmark-child"
			data-v-5504764e
			draggable="false"
			title={title}
			href={url}
		>
			<span className="bookmark-icon-wrapper" data-v-5504764e>
				<img
					className="bookmark-icon bookmark-child-icon"
					src={`https://www.google.com/s2/favicons?domain=${url}&sz=16`}
					draggable="false"
					data-v-5504764e
				/>
			</span>
			<span className="bookmark-label" data-v-5504764e>
				{title}
			</span>
		</a>
	</li>
);

const FolderDropdown = ({ bookmarks }) => (
	<div
		className="app dropdown more-dropdown dash-dropdown folder-dropdown nipple nipple-top-left"
		data-v-5504764e
	>
		<div className="dropdown-wrapper" data-v-5504764e>
			<ul className="dropdown-list" data-v-5504764e>
				{bookmarks?.map((bookmark) => (
					<FolderBookmark key={bookmark.id} {...bookmark} />
				))}
			</ul>
		</div>
	</div>
);

const Folder = (folder) => (
	<li className="bookmarks-item" data-v-10674610>
		<span
			className="bookmark folder"
			title={folder.title}
			draggable="false"
			data-v-5504764e
			data-v-10674610
		>
			<div className="folder-wrapper" data-v-5504764e>
				{folderIcon}
				<span className="bookmark-label" data-v-5504764e>
					{folder.title}
				</span>
			</div>
			<FolderDropdown bookmarks={folder.children} />
		</span>
	</li>
);

const BookmarksItem = ({ title, url }) => (
	<li className="bookmarks-item" data-v-10674610>
		<a
			className="bookmark"
			title={title}
			href={url}
			draggable="false"
			data-v-00c414ea
			data-v-10674610
		>
			<span className="bookmark-icon-wrapper" data-v-00c414ea>
				<img
					className="bookmark-icon"
					src={`https://www.google.com/s2/favicons?domain=${url}&sz=16`}
					draggable="false"
					data-v-00c414ea
				/>
			</span>
			<span className="bookmark-label" data-v-00c414ea>
				{title}
			</span>
		</a>
	</li>
);

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
				<Folder />
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
