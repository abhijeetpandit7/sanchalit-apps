import React, { lazy, Suspense, useEffect, useState } from "react";
import { DropdownToggleWrapper } from "../../../components";
import {
	QUERY_PARAM,
	SEARCH,
	SEARCH_PROVIDER_LIST,
	searchIcon,
} from "../../../utils";

const Loading = () => (
	<div className="dropdown more-dropdown app dash-dropdown nipple nipple-top-left">
		<ul className="dropdown-list">
			<div className="heading dropdown-list-loading">
				<i className="loading-icon"></i>
				Loading...
			</div>
		</ul>
	</div>
);

const Dropdown = lazy(() => import("../Dropdown/Dropdown"));

export const Form = (props) => {
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => props.setWidgetReady({ widget: SEARCH }), []);

	const toggleDropdownApp = () => setComponentDidMount(true);

	const activeSearchProvider = SEARCH_PROVIDER_LIST.find(
		({ name }) => name === props.provider,
	);

	return (
		<form
			className="search-form hide-apps-fade"
			action={activeSearchProvider.action}
		>
			<div className="search-underline"></div>
			{props.topRow ? (
				<i className="dash-icon icon-search"></i>
			) : (
				<div className="search-icon-container">{searchIcon}</div>
			)}
			<DropdownToggleWrapper
				onToggle={toggleDropdownApp}
				iconSource={props[activeSearchProvider.base64SourceKey]}
			>
				{componentDidMount && (
					<Suspense fallback={<Loading />}>
						<Dropdown />
					</Suspense>
				)}
			</DropdownToggleWrapper>
			<input
				id="search-input"
				className="search-input"
				placeholder={props.topRow ? "" : "Search"}
				type="text"
				autoComplete="off"
				name={QUERY_PARAM}
				ref={props.searchInputRef}
			/>
		</form>
	);
};
