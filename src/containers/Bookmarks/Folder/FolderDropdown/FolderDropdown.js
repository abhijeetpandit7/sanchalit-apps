import React from "react";
import { Folder } from "../Folder";

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

export const FolderDropdown = ({ bookmarks }) => (
	<div
		className="app dropdown more-dropdown dash-dropdown folder-dropdown nipple nipple-top-left"
		data-v-5504764e
	>
		<div className="dropdown-wrapper" data-v-5504764e>
			<ul className="dropdown-list" data-v-5504764e>
				{bookmarks.map((bookmark) =>
					bookmark.children ? (
						<Folder key={bookmark.id} {...bookmark} />
					) : (
						<FolderBookmark key={bookmark.id} {...bookmark} />
					),
				)}
			</ul>
		</div>
	</div>
);
