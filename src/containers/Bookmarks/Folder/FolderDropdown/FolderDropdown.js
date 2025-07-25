import React from "react";
import { Folder } from "../Folder";
import { FOLDER_DROPDOWN, getFaviconUrl } from "../../../../utils";

const FolderBookmark = ({ bookmark: { id, title, url }, openInNewTab }) => (
	<li id={id} className="dropdown-item" data-v-5504764e>
		<a
			className="bookmark bookmark-child"
			data-v-5504764e
			draggable="false"
			title={title}
			onClick={() =>
				openInNewTab
					? chrome.tabs.create({ url, active: false })
					: chrome.tabs.update({ url })
			}
		>
			<span className="bookmark-icon-wrapper" data-v-5504764e>
				<img
					className="bookmark-icon bookmark-child-icon"
					src={getFaviconUrl(url)}
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

export const FolderDropdown = ({ bookmarks, openInNewTab }) => (
	<div
		className={`app dropdown more-dropdown dash-dropdown ${FOLDER_DROPDOWN} nipple nipple-top-left`}
		data-v-5504764e
	>
		<div className="dropdown-wrapper" data-v-5504764e>
			<ul className="dropdown-list" data-v-5504764e>
				{bookmarks.map((bookmark) =>
					bookmark.children ? (
						<Folder key={bookmark.id} {...{ bookmark, openInNewTab }} />
					) : (
						<FolderBookmark key={bookmark.id} {...{ bookmark, openInNewTab }} />
					),
				)}
			</ul>
		</div>
	</div>
);
