import React from "react";
import { getFaviconUrl } from "../../../utils";

export const BookmarksItem = ({
	bookmark: { id, title, url, imgSrc, svg },
	iconsOnly,
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
				{svg || (
					<img
						className="bookmark-icon"
						src={
							imgSrc || getFaviconUrl(url)
						}
						draggable="false"
						data-v-00c414ea
					/>
				)}
			</span>
			{iconsOnly === false && (
				<span className="bookmark-label" data-v-00c414ea>
					{title}
				</span>
			)}
		</a>
	</li>
);
