import React from "react";
import { Folder, BookmarksItem } from "../";
import { BOOKMARKS, backIcon } from "../../../utils";

const Back = ({ toggleMostVisitedView }) => (
	<li data-v-10674610 className="bookmarks-item back">
		<a
			className="bookmark"
			title={BOOKMARKS}
			onClick={toggleMostVisitedView}
			draggable="false"
			data-v-00c414ea
			data-v-10674610
		>
			<span data-v-00c414ea className="bookmark-icon-wrapper">
				<span className="icon-back-wrapper" data-v-00c414ea>
					{backIcon}
				</span>
			</span>
		</a>
	</li>
);

export const MostVisited = ({
	bookmarksList,
	iconsOnly,
	openInNewTab,
	toggleMostVisitedView,
}) => (
	<>
		<Back {...{ toggleMostVisitedView }} />
		{bookmarksList.map((bookmark) =>
			bookmark.children ? (
				<Folder key={bookmark.id} {...{ bookmark, iconsOnly, openInNewTab }} />
			) : (
				<BookmarksItem
					key={bookmark.id}
					{...{ bookmark, iconsOnly, openInNewTab }}
				/>
			),
		)}
	</>
);
