import React, { useRef, useState } from "react";
import { FolderDropdown } from "./FolderDropdown/FolderDropdown";
import { FocusOutHandler } from "../../../hooks";
import {
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

	return (
		<li className="bookmarks-item" data-v-10674610>
			<span
				className="bookmark folder"
				title={folder.title}
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
					{folderIcon}
					<span className="bookmark-label" data-v-5504764e>
						{folder.title}
					</span>
				</div>
				{componentDidMount && <FolderDropdown bookmarks={folder.children} />}
			</span>
		</li>
	);
};
