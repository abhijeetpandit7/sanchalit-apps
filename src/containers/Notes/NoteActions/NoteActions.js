import React, { useState } from "react";
import {
	DELETE_CONF_ACTIVE,
	checkmarkIcon,
	crossmarkIcon,
	expandIcon,
	hideIcon,
	menuIcon,
	plusIcon,
	trashIcon,
	trashRestoreIcon,
	formatDate,
	formatTime,
} from "../../../utils";

export const NoteActions = (props) => {
	const [isDeletingNote, setIsDeletingNote] = useState(false);

	const date = formatDate({
		timestamp: props.activeNote.updatedDate,
		hour12clock: props.hour12clock,
		relativeDay: true,
	});
	const time = formatTime({
		timestamp: props.activeNote.updatedDate,
		hour12clock: props.hour12clock,
	});
	const getNotesDetailTitle = () => `${date} at ${time}`;

	const createNewNote = () => {
		if (props.trashSubView) props.setTrashSubView(false);
		const containsEmptyStateNote = props.processedNotes.some(
			(note) => note.empty === true,
		);
		if (containsEmptyStateNote == false) props.createNoteFromEmptyState();
	};

	const restoreNoteAndSubView = () => {
		props.restoreNote(props.activeNote);
		props.setTrashSubView(false);
		props.setCurrentNoteId(props.activeNote.id);
	};

	return (
		<>
			{props.activeNote && (
				<div
					className={`header notes-detail-header has-3-col ${
						isDeletingNote ? DELETE_CONF_ACTIVE : ""
					}`}
				>
					{/* TODO: mobile notes-list-open */}
					<div className="side-col left-col">
						{/* TODO: Show menu icon on fullscreen */}
						<span
							className="control mobile-open-list icon-wrapper"
							title="Notes List"
						>
							{menuIcon}
						</span>
					</div>

					<div className="center-col">
						<span className="notes-detail-title">{getNotesDetailTitle()}</span>
					</div>

					<div className="side-col right-col">
						<div className="controls main-nav">
							<span
								className="control new"
								title="New Note"
								onClick={createNewNote}
							>
								<span className="icon-wrapper">{plusIcon}</span>
							</span>
							<span
								className="control delete"
								title="Delete"
								onClick={() => setIsDeletingNote(true)}
							>
								<span className="icon-wrapper">{trashIcon}</span>
							</span>
							<span
								className="control restore"
								title="Restore"
								onClick={restoreNoteAndSubView}
							>
								<span className="icon-wrapper">{trashRestoreIcon}</span>
							</span>
							{/* TODO: fullscreen onClick */}
							<span
								className="control toggle-fullscreen"
								title="Toggle Fullscreen"
							>
								<span className="icon-wrapper">{expandIcon}</span>
							</span>
							{/* TODO: close notes onClick */}
							<span className="control mobile-close" title="Close Notes">
								<span className="icon-wrapper u--mobile-show-bg hide">
									{hideIcon}
								</span>
							</span>
						</div>

						<span className="controls delete-nav delete-group">
							<span className="delete-msg">Delete?</span>
							<span
								className="control delete-yes"
								onClick={() => {
									props.deleteNote(props.activeNote);
									setIsDeletingNote(false);
								}}
							>
								<span className="icon-wrapper">{checkmarkIcon}</span>
							</span>
							<span
								className="control delete-no"
								onClick={() => setIsDeletingNote(false)}
							>
								<span className="icon-wrapper">{crossmarkIcon}</span>
							</span>
						</span>
					</div>
				</div>
			)}
		</>
	);
};
