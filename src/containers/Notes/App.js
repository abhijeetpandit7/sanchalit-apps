import React, { memo, useEffect, useState } from "react";
import { Navbar, NoteActions, UserActions, ViewContainer } from "../Notes";
import { useUserActions, useUserCustomization } from "../../hooks";
import { processNotes } from "../../utils";

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
	const [searchText, setSearchText] = useState("");
	const [processedNotes, setProcessedNotes] = useState(
		processNotes(notes, searchText),
	);

	useEffect(() => {
		setProcessedNotes(processNotes(notes, searchText));
	}, [notes, searchText]);

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
				<UserActions {...{ searchText, setSearchText }} />
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
