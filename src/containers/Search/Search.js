import React, { memo } from "react";
import { SwitchNavWrapper } from "../../components";
import { useUserCustomization } from "../../hooks";
import {
	QUERY_PARAM,
	SEARCH_ACTION,
	dropdownIcon,
	searchIcon,
} from "../../utils";

const Form = ({ topRow }) => (
	<form className="search-form hide-apps-fade" action={SEARCH_ACTION}>
		<div className="search-underline"></div>
		{topRow ? (
			<i className="dash-icon icon-search"></i>
		) : (
			<div className="search-icon-container">{searchIcon}</div>
		)}
		<div className="more more source more-dash">
			<div className="source-toggle" tabIndex="0">
				<div className="source-selected">
					<img
						className="icon-ecosia icon icon-source active"
						src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZmlsbD0id2hpdGUiIGlkPSJhIiBkPSJNNDQuNSAyMEgyNHY4LjVoMTEuOEMzNC43IDMzLjkgMzAuMSAzNyAyNCAzN2MtNy4yIDAtMTMtNS44LTEzLTEzczUuOC0xMyAxMy0xM2MzLjEgMCA1LjkgMS4xIDguMSAyLjlsNi40LTYuNEMzNC42IDQuMSAyOS42IDIgMjQgMiAxMS44IDIgMiAxMS44IDIgMjRzOS44IDIyIDIyIDIyYzExIDAgMjEtOCAyMS0yMiAwLTEuMy0uMi0yLjctLjUtNHoiLz48L3N2Zz4="
					/>
				</div>
				{dropdownIcon}
			</div>
		</div>
		<input
			id="search-input"
			className="search-input"
			placeholder={topRow ? "" : "Search"}
			type="text"
			autoComplete="off"
			name={QUERY_PARAM}
		/>
	</form>
);

const CenterContextMemo = memo(() => (
	<div className="has-3-col has-dash-icon big-search-wrapper">
		<div className="side-col left">
			<SwitchNavWrapper />
		</div>
		<div className="center-col" data-v-d6260d64>
			<div className="big search app-container hide-apps-no-fade">
				<Form />
				<div className="backdrop-filter hide-apps-fade"></div>
			</div>
		</div>
		<div className="side-col right"></div>
	</div>
));

const TopContextMemo = memo(() => (
	<div id="search" className="app-dash app-container search" data-v-c28d382a>
		<Form topRow={true} />
	</div>
));

export const Search = ({ topRow }) => {
	const { storageUserCustomization } = useUserCustomization();
	const { searchVisible, searchSettings } = storageUserCustomization;

	return (
		<>
			{searchVisible &&
				(topRow
					? searchSettings.inCenter === false && <TopContextMemo />
					: searchSettings.inCenter && <CenterContextMemo />)}
		</>
	);
};
