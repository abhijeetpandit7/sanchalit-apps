import React from "react";

export const ViewContainer = (props) => {
	return (
		<div className="detail-view">
			{props.activeNote && (
				<div className={`notes-detail ${props.trashSubView ? "deleted" : ""}`}>
					<div className="list-bar-wrapper">
						<div className="list-bar"></div>
					</div>
					<div className="detail-bar">
						{props.children}
						<div className="note-body">
							<textarea
								className="notes-input notes-textarea"
								placeholder="New Note…"
								value={props.activeNote.body}
								onChange={(event) => props.saveNote(event, props.activeNote)}
								ref={props.notesInputRef}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
