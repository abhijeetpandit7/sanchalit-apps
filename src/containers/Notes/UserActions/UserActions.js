import React, { memo } from "react";
import { MoreToggleWrapper1 } from "../../../components";
import { clearIcon, ellipsisIcon2, trashIcon } from "../../../utils";

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
			<MoreToggleWrapper1>
				<div className="dropdown more-dropdown" data-v-5504764f>
					<ul className="dropdown-list">
						<li className="dropdown-list-item show-deleted">
							<span className="dropdown-list-icon-wrapper">{trashIcon}</span>
							<span className="dropdown-list-label">Deleted</span>
						</li>
					</ul>
				</div>
			</MoreToggleWrapper1>
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
