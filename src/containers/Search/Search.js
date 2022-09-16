import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { DropdownToggleWrapper } from "../../components";
import { useUserActions, useUserCustomization } from "../../hooks";
import {
	QUERY_PARAM,
	SEARCH,
	SEARCH_PROVIDER_LIST,
	searchIcon,
	bingBase64Source,
	duckDuckGoBase64Source,
	ecosiaBase64Source,
	googleBase64Source,
} from "../../utils";

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

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));

const Form = (props) => {
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

const CenterContextMemo = memo((props) => (
	<div className="has-3-col has-dash-icon big-search-wrapper">
		<div className="side-col left"></div>
		<div className="center-col" data-v-d6260d64>
			<div className="big search app-container hide-apps-no-fade">
				<Form {...props} />
				<div className="backdrop-filter hide-apps-fade"></div>
			</div>
		</div>
		<div className="side-col right"></div>
	</div>
));

const TopContextMemo = memo((props) => (
	<div id="search" className="app-dash app-container search" data-v-c28d382a>
		<Form {...{ ...props, topRow: true }} />
	</div>
));

export const Search = ({ topRow }) => {
	const {
		searchInputRef,
		storageUserCustomization: { searchVisible, searchSettings },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>
			{searchVisible &&
				(topRow
					? searchSettings.inCenter === false && (
							<TopContextMemo
								{...{
									bingBase64Source,
									duckDuckGoBase64Source,
									ecosiaBase64Source,
									googleBase64Source,
									searchInputRef,
									provider: searchSettings.provider,
									setWidgetReady,
								}}
							/>
					  )
					: searchSettings.inCenter && (
							<CenterContextMemo
								{...{
									bingBase64Source,
									duckDuckGoBase64Source,
									ecosiaBase64Source,
									googleBase64Source,
									searchInputRef,
									provider: searchSettings.provider,
									setWidgetReady,
								}}
							/>
					  ))}
		</>
	);
};
