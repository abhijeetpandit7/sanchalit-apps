import React, { useRef, useState } from "react";
import { FolderDropdown } from "./FolderDropdown/FolderDropdown";
import { FocusOutHandler } from "../../../hooks";
import {
	OVERFLOW,
	BOOKMARKS_BAR_ID,
	BOOKMARKS_BAR_FIREFOX_ID,
	BOOKMARKS_ROOT_ID,
	BOOKMARKS_ROOT_FIREFOX_ID,
	ellipsisIcon1,
	folderIcon,
	hideBookmarkFolder,
	toggleBookmarkFolder,
} from "../../../utils";

export const Folder = ({ bookmark: folder, openInNewTab }) => {
	const bookmarkFolderRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);

	FocusOutHandler({ ref: bookmarkFolderRef, callback: hideBookmarkFolder });

	const isOverflowFolder = folder.id === OVERFLOW;
	const isNestedFolder =
		folder.parentId !== BOOKMARKS_BAR_ID &&
		folder.parentId !== BOOKMARKS_BAR_FIREFOX_ID &&
		folder.parentId !== BOOKMARKS_ROOT_ID &&
		folder.parentId !== BOOKMARKS_ROOT_FIREFOX_ID;
	const isParentHierarchyOverflow = folder.parentHierarchyOverflow === true;
	const isParentOverflow = folder.parentOverflow === true;

	const toggleBookmarkItem = async () => {
		await setComponentDidMount(true);
		const ignoreOverflow = isNestedFolder || isParentHierarchyOverflow;
		toggleBookmarkFolder(bookmarkFolderRef, ignoreOverflow);
	};

	return (
		<li
			id={folder.id}
			className={`bookmarks-item ${isOverflowFolder ? OVERFLOW : ""}`}
			data-v-10674610
		>
			<span
				className="bookmark folder"
				title={isOverflowFolder ? "" : folder.title}
				ref={bookmarkFolderRef}
				draggable="false"
				data-v-5504764e
				data-v-10674610
			>
				<div
					className="folder-wrapper"
					onClick={toggleBookmarkItem}
					data-v-5504764e
				>
					{isOverflowFolder ? ellipsisIcon1 : folderIcon}
					{isOverflowFolder === false && (
						<span className="bookmark-label" data-v-5504764e>
							{folder.title}
						</span>
					)}
				</div>
				{componentDidMount && (
					<FolderDropdown {...{ bookmarks: folder.children, openInNewTab }} />
				)}
			</span>
		</li>
	);
};

// TODO: .folder-wrapper height should be equal to .bookmark.folder
