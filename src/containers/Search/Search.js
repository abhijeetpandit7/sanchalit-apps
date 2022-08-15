import React from "react";
import { SwitchNavWrapper } from "../../components";
import { dropdownIcon, searchIcon } from "../../utils";

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
						<div className="more more source more-dash">
							<div className="source-toggle" tabIndex="0">
								<div className="source-selected">
									<img
										className="icon-ecosia icon icon-source active"
										src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxOSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgNi45MTYwOVYxOC42NjgxSDExLjE3NVYxMi40MjAxSDQuNjNWMTAuNDMwMUg4LjcyMlY4LjY1MDA5SDQuNjNWNi44MDUwOUgxMS4xNzVWMC40MTMwODZIMFY2LjkxNjA5WiIvPjwvc3ZnPgo="
									/>
								</div>
								{dropdownIcon}
							</div>
						</div>
						<input
							id="search-input"
							className="search-input"
							placeholder="Search"
							type="text"
							autoComplete="off"
							search-url="https://www.ecosia.org/search?q=&amp;tt=c4ccf3a1"
						/>
					</form>
					<div className="backdrop-filter hide-apps-fade"></div>
				</div>
			</div>
			<div className="side-col right"></div>
		</div>
	);
};
