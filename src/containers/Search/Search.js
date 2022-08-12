import React from "react";
import { SwitchNavWrapper } from "../../components";
import { searchIcon, dropdownIcon } from "../../utils";

export const Search = () => {
	return (
		<div className="has-3-col has-dash-icon big-search-wrapper">
			<div className="side-col left">
				<SwitchNavWrapper />
			</div>
			<div className="center-col" data-v-d6260d64>
				<div className="big search app-container hide-apps-no-fade">
					<form className="search-form hide-apps-fade">
						<div className="search-underline"></div>
						<div className="search-icon-container">{searchIcon}</div>
						<div
							className="more more source more-dash"
							section-title="Search with"
						>
							<div tabIndex="0" className="source-toggle">
								<div className="source-selected">
									<img
										src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxOSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgNi45MTYwOVYxOC42NjgxSDExLjE3NVYxMi40MjAxSDQuNjNWMTAuNDMwMUg4LjcyMlY4LjY1MDA5SDQuNjNWNi44MDUwOUgxMS4xNzVWMC40MTMwODZIMFY2LjkxNjA5WiIvPjwvc3ZnPgo="
										className="icon-ecosia icon icon-source active"
									/>
								</div>
								{dropdownIcon}
							</div>
						</div>
						<input
							id="search-input"
							search-url="https://www.ecosia.org/search?q=&amp;tt=c4ccf3a1"
							type="text"
							autoComplete="off"
							placeholder="Search"
							className="search-input"
						/>
					</form>
					<div className="backdrop-filter hide-apps-fade"></div>
				</div>
			</div>
			<div className="side-col right">
				<div className="slot-wrapper"></div>
			</div>
		</div>
	);
};
