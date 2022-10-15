import React from "react";
import {
	hideIcon,
	checkForMultiLineNote,
	formatDate,
	getBodyPreview,
	getBodyTitle,
	getRandomDelighter,
} from "../../../utils";

export const Navbar = (props) => {
	const changeActiveNote = (note) => {
		props.setCurrentNoteId(note.id);
		const containsEmptyStateNote = props.processedNotes.some(
			(note) => note.empty === true,
		);
		containsEmptyStateNote && props.cleanupNotes();
	};

	return (
		<div className="list-view">
			<div className="notes-list">
				<div className="note-list-outer-wrapper">
					<div className="subviews-wrapper">
						<div className="subviews">
							<div className="note-list-wrapper subview">
								{props.children}
								<ol className="list note-list">
									{props.processedNotes.map((note) => (
										<li
											className={`list-borders notes-list-item ${
												props.activeNote.id === note.id ? "selected" : ""
											}`}
											onClick={() => changeActiveNote(note)}
											key={note.id}
										>
											<div>
												<span className="notes-list-title">
													{note.body ? getBodyTitle(note.body) : "Empty Note"}
												</span>
											</div>
											<div className="notes-list-row-description">
												<span className="notes-list-date">
													{formatDate({
														timestamp: note.updatedDate,
														hour12clock: props.hour12clock,
													})}
												</span>
												<span className="notes-list-body">
													{note.body
														? checkForMultiLineNote(note.body)
															? getBodyPreview(note.body)
															: ""
														: getRandomDelighter()}
												</span>
											</div>
										</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="u--pafill notes-empty">
					<div className="empty">
						<div className="title">
							Take quick notes and store wisdom to view later.
						</div>
						<div className="description">
							No notes yet. Add a note to get started!
						</div>
						<span
							className="button notes-empty-new"
							onClick={props.createNoteFromEmptyState}
						>
							New Note
						</span>
					</div>
					{/* TODO: Add onClick close */}
					<span className="control mobile-close" title="Close Notes">
						<span className="icon-wrapper u--mobile-show-bg hide">
							{hideIcon}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};
