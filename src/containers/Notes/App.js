import React, { memo, useEffect } from "react";
import { Navbar, NoteActions, UserActions, ViewContainer } from "../Notes";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = memo((props) => {
	const activeNote =
		props.notes
			.filter((note) => note.deleted === false)
			.find(({ id }) => id === props.currentNoteId) ||
		props.notes.filter((note) => note.deleted === false)[0];

	useEffect(() => props.cleanupNotes(), []);

	return (
		<div className={`app notes-app ${activeNote ? "" : "notes-empty-active"}`}>
			<Navbar {...{ ...props, activeNote }}>
				<UserActions {...{ ...props }} />
			</Navbar>
			<ViewContainer {...{ ...props, activeNote }}>
				<NoteActions {...{ ...props, activeNote }} />
			</ViewContainer>
		</div>
	);
});

const App = () => {
	const {
		notesInputRef,
		storageUserCustomization: { currentNoteId, hour12clock, notes },
	} = useUserCustomization();
	const {
		cleanupNotes,
		createNoteFromEmptyState,
		deleteNote,
		saveNote,
		setCurrentNoteId,
	} = useUserActions();

	return (
		<ContextMemo
			{...{
				notesInputRef,
				currentNoteId,
				hour12clock,
				notes,
				cleanupNotes,
				createNoteFromEmptyState,
				deleteNote,
				saveNote,
				setCurrentNoteId,
			}}
		/>
	);
};

export default App;
