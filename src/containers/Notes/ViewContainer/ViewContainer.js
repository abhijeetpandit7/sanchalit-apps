import React, { useEffect, useRef, useState } from "react";

const DEBOUNCE_SECONDS = 2;

export const ViewContainer = (props) => {
	const saveTimeoutRef = useRef(null);
	const [noteBody, setNoteBody] = useState("");
	let noteBodyRef = useRef("");

	useEffect(() => {
		setNoteBody(props.activeNote.body);
		noteBodyRef.current = props.activeNote.body;
	}, [props.activeNote.body]);

	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
			if (noteBodyRef.current !== props.activeNote.body) {
				props.saveNote(noteBodyRef.current, props.activeNote);
			}
		};
	}, [props.activeNote.id]);

	const noteBodyChangeHandler = (event) => {
		setNoteBody(event.target.value);
		noteBodyRef.current = event.target.value;
		startSaveTimeout();
	};

	const startSaveTimeout = () => {
		if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
		if (props.activeNote.empty)
			props.saveNote(noteBodyRef.current, props.activeNote);
		else
			saveTimeoutRef.current = setTimeout(
				() => props.saveNote(noteBodyRef.current, props.activeNote),
				DEBOUNCE_SECONDS * 1000,
			);
	};

	// TODO: Restore this note to edit for deleted notes
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
								value={noteBody}
								onChange={noteBodyChangeHandler}
								ref={props.notesInputRef}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
