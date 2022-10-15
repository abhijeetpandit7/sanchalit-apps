import React, { memo } from "react";
import { clearIcon } from "../../../utils";

export const UserActions = memo((props) => (
	<header className="header notes-list-header">
		<div className="search-more-wrapper">
			<span className="search-wrapper">
				<span className="input-wrapper">
					<i className="icon icon-search"></i>
					<span
						className="icon-clear-wrapper"
						style={{
							display: props.searchText ? "flex" : "none",
						}}
						onClick={() => props.setSearchText("")}
					>
						{clearIcon}
					</span>
					<input
						id="notes-search"
						className="search-input notes-search search-active"
						placeholder="Search"
						name="search"
						type="text"
						value={props.searchText}
						onChange={(event) => props.setSearchText(event.target.value)}
					/>
				</span>
			</span>
		</div>
		<div className="list-bar-toggle">
			<span
				className="control icon-wrapper toggle-list-icons"
				title="Note List"
			>
				<i className="icon icon-list-toggle u--no-transition">
					<span className="list-toggle-top"></span>
					<span className="list-toggle-middle"></span>
					<span className="list-toggle-bottom"></span>
				</i>
			</span>
		</div>
	</header>
));
