import React, { memo, useEffect, useRef, useState } from "react";
const App = memo(({ currentNodeId, notes }) => {
	const isNotesEmpty = !notes.length;

	console.log("App.render");

	return (
		<div
			className={`app notes-app ${isNotesEmpty ? "notes-empty-active" : ""}`}
		>
		</div>
	);
});

export default App;
