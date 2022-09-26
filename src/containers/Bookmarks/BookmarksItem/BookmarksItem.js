import React from "react";

export const BookmarksItem = ({
	bookmark: { id, title, url },
	openInNewTab,
}) => (
	<li id={id} className="bookmarks-item" data-v-10674610>
		<a
			className="bookmark"
			title={title}
			onClick={() =>
				openInNewTab
					? chrome.tabs.create({ url, active: false })
					: chrome.tabs.update({ url })
			}
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
