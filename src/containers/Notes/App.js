import React, { memo, useEffect } from "react";
import { Navbar, NoteActions, UserActions, ViewContainer } from "../Notes";
import { useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = memo((props) => {
	const {
		notesInputRef,
		currentNoteId,
		hour12clock,
		notes,
		cleanupNotes,
		createNoteFromEmptyState,
		deleteNote,
		saveNote,
		setCurrentNoteId,
	} = props;

	// TODO: Add other sorting
	const processedNotes = notes
		.filter((note) => note.deleted === false)
		.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));

	const activeNote =
		processedNotes.find(({ id }) => id === currentNoteId) || processedNotes[0];

	useEffect(() => cleanupNotes(), []);

	return (
		<div className={`app notes-app ${activeNote ? "" : "notes-empty-active"}`}>
			<Navbar
				{...{
					activeNote,
					hour12clock,
					processedNotes,
					cleanupNotes,
					createNoteFromEmptyState,
					setCurrentNoteId,
				}}
			>
				<UserActions />
			</Navbar>
			<ViewContainer {...{ notesInputRef, activeNote, saveNote }}>
				<NoteActions
					{...{
						activeNote,
						hour12clock,
						processedNotes,
						createNoteFromEmptyState,
						deleteNote,
					}}
				/>
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
