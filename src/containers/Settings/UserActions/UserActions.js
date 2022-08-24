import React, { memo, useRef } from "react";
import { FocusOutHandler } from "../../../hooks";
import {
	OPEN,
	angleDownIcon,
	caretLeft,
	caretRight,
	hideIcon,
	toggleRefClassName,
	hideUserNav,
} from "../../../utils";

export const UserActions = memo((props) => {
	const userContainerRef = useRef(null);

	FocusOutHandler({ ref: userContainerRef, callback: hideUserNav });

	const toggleUserContainer = () => toggleRefClassName(userContainerRef, OPEN);

	return (
		<div className="settings-nav-header">
			<div className="settings-nav-chooser" onClick={props.toggleViewContainer}>
				<span className="settings-nav-active">{props.activeNav}</span>
				{angleDownIcon}
			</div>
			<div className="settings-nav-user">
				<div className="user-container has-plus" ref={userContainerRef}>
					<div className="user">
						<div className="user-row" onClick={toggleUserContainer}>
							<div className="user-avatar-wrapper">
								<div className="user-avatar">
									<img
										className="user-avatar-img"
										src="https://www.gravatar.com/avatar/37a6259cc0c1dae299a7866489dff0bd?s=50&amp;d=mm"
									/>
									<div className="user-badge-wrapper">
										<span className="badge badge-plus">PLUS</span>
										<span className="badge badge-team">TEAM</span>
									</div>
								</div>
							</div>
							<span className="user-name-wrapper">
								<span className="user-info-name">Abhijeet</span>
								<span className="anim-caret">
									{caretLeft}
									{caretRight}
								</span>
							</span>
						</div>
						<div className="user-nav-desktop">
							<ul className="user-nav">
								<li className="action action-profile">Profile</li>
								<li className="action action-logout">Log Out</li>
							</ul>
							<div className="user-close"></div>
						</div>
						<div className="user-nav-mobile">
							<nav className="user-nav dropdown nipple nipple-top-right">
								<ul className="dropdown-list">
									<li className="dropdown-list-item action action-profile">
										Profile
									</li>
									<li className="dropdown-list-item action action-logout">
										Log Out
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
			<span className="mobile-close">
				<span
					className="icon-wrapper u--mobile-show-bg hide"
					onClick={props.toggleSettingsApp}
				>
					{hideIcon}
				</span>
			</span>
		</div>
	);
});
