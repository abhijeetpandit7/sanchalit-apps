import React, { memo, useEffect, useRef, useState } from "react";
import { Navbar, NoteActions, UserActions, ViewContainer } from "../Notes";
import { useUserActions, useUserCustomization } from "../../hooks";
import { processNotes, toggleFullscreen } from "../../utils";

const ContextMemo = memo((props) => {
	const {
		appWrapperRef,
		notesRef,
		notesToggleAppRef,
		notesInputRef,
		currentNoteId,
		hour12clock,
		notes,
		cleanupNotes,
		createNoteFromEmptyState,
		deleteNote,
		hideApps,
		restoreNote,
		saveNote,
		setCurrentNoteId,
		showApps,
	} = props;

	const notesAppRef = useRef(null);
	// TODO: Add other sorting
	const [searchText, setSearchText] = useState("");
	const [trashSubView, setTrashSubView] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [processedNotes, setProcessedNotes] = useState(
		processNotes(notes, searchText, trashSubView),
	);

	useEffect(() => cleanupNotes(), []);

	useEffect(() => {
		setProcessedNotes(processNotes(notes, searchText, trashSubView));
	}, [notes, searchText, trashSubView]);

	const activeNote =
		processedNotes.find(({ id }) => id === currentNoteId) || processedNotes[0];

	const isNotesNotEmpty =
		processedNotes.length || processNotes(notes, "", trashSubView).length;

	const isDeletedNotesNotEmpty = () => processNotes(notes, "", true).length;

	const toggleFullscreenHandler = async () => {
		const isNotesFullscreen = await toggleFullscreen(
			notesRef,
			notesToggleAppRef,
			appWrapperRef,
			notesAppRef,
		);
		isNotesFullscreen ? hideApps() : showApps();
		setIsFullscreen(isNotesFullscreen);
	};

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
			ref={notesAppRef}
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
						isFullscreen,
						processedNotes,
						trashSubView,
						createNoteFromEmptyState,
						deleteNote,
						restoreNote,
						setCurrentNoteId,
						setTrashSubView,
						toggleFullscreenHandler,
					}}
				/>
			</ViewContainer>
		</div>
	);
});

const App = ({ appWrapperRef, notesRef, notesToggleAppRef }) => {
	const {
		notesInputRef,
		storageUserCustomization: { currentNoteId, hour12clock, notes },
		hideApps,
		showApps,
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
				appWrapperRef,
				notesRef,
				notesToggleAppRef,
				notesInputRef,
				currentNoteId,
				hour12clock,
				notes,
				cleanupNotes,
				createNoteFromEmptyState,
				deleteNote,
				hideApps,
				restoreNote,
				saveNote,
				setCurrentNoteId,
				showApps,
			}}
		/>
	);
};

export default App;
