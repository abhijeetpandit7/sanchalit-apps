import React, { useRef, useState } from "react";
import { FolderDropdown } from "./FolderDropdown/FolderDropdown";
import { FocusOutHandler } from "../../../hooks";
import {
	OVERFLOW,
	ellipsisIcon1,
	folderIcon,
	hideBookmarkFolder,
	toggleBookmarkFolder,
} from "../../../utils";

export const Folder = (folder) => {
	const bookmarkFolderRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);

	FocusOutHandler({ ref: bookmarkFolderRef, callback: hideBookmarkFolder });

	const toggleBookmarkItem = () => {
		toggleBookmarkFolder(bookmarkFolderRef);
		setComponentDidMount(true);
	};

	const isOverflowFolder = folder.id === OVERFLOW;

	return (
		<li
			id={folder.id}
			className={`bookmarks-item ${isOverflowFolder ? OVERFLOW : ""}`}
			data-v-10674610
		>
			<span
				className={`bookmark folder ${isOverflowFolder ? "shift-to-left" : ""}`}
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
				{componentDidMount && <FolderDropdown bookmarks={folder.children} />}
			</span>
		</li>
	);
};

// TODO: .folder-wrapper height should be equal to .bookmark.folder
// TODO: shift-to-left .folder-dropdown if out of screen
