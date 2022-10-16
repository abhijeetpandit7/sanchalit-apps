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
		restoreNote,
		saveNote,
		setCurrentNoteId,
	} = props;

	// TODO: Add other sorting
	const [searchText, setSearchText] = useState("");
	const [trashSubView, setTrashSubView] = useState(false);
	const [processedNotes, setProcessedNotes] = useState(
		processNotes(notes, searchText, trashSubView),
	);

	useEffect(() => {
		setProcessedNotes(processNotes(notes, searchText, trashSubView));
	}, [notes, searchText, trashSubView]);

	const activeNote =
		processedNotes.find(({ id }) => id === currentNoteId) || processedNotes[0];

	const isNotesNotEmpty =
		processedNotes.length || processNotes(notes, "", trashSubView).length;

	const isDeletedNotesNotEmpty = () => processNotes(notes, "", true).length;

	useEffect(() => cleanupNotes(), []);

	return (
		<div
			className={`app notes-app 
			${
				trashSubView
					? isDeletedNotesNotEmpty()
						? ""
						: "deleted-empty deleted-empty-active"
					: isNotesNotEmpty
					? ""
					: "notes-empty-active"
			}
			`}
		>
			<Navbar
				{...{
					activeNote,
					hour12clock,
					processedNotes,
					trashSubView,
					cleanupNotes,
					createNoteFromEmptyState,
					setCurrentNoteId,
					setTrashSubView,
				}}
			>
				<UserActions {...{ searchText, setSearchText, setTrashSubView }} />
			</Navbar>
			<ViewContainer
				{...{
					notesInputRef,
					activeNote,
					trashSubView,
					saveNote,
				}}
			>
				<NoteActions
					{...{
						activeNote,
						hour12clock,
						processedNotes,
						trashSubView,
						createNoteFromEmptyState,
						deleteNote,
						restoreNote,
						setCurrentNoteId,
						setTrashSubView,
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
		restoreNote,
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
				restoreNote,
				saveNote,
				setCurrentNoteId,
			}}
		/>
	);
};

export default App;
