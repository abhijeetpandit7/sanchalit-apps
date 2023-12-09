import React, { memo, useRef } from "react";
import {
	FocusOutHandler,
	useAuth,
	useAuthActions,
	useUserCustomization,
} from "../../../hooks";
import {
	OPEN,
	URL_ACCOUNT_PAGE,
	isBuildTargetWeb,
	angleDownIcon,
	caretLeft,
	caretRight,
	defaultAvatarBase64Source,
	hideIcon,
	toggleRefClassName,
	hideUserNav,
} from "../../../utils";

const loginButtonClickHander = () => {
	if (isBuildTargetWeb) {
		window.location.href = URL_ACCOUNT_PAGE;
	} else {
		const width = 500;
		const height = 550;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;
		window.open(
			`${URL_ACCOUNT_PAGE}?oneTimeLogin`,
			"_blank",
			`width=${width}, height=${height}, left=${left}, top=${top}`,
		);
	}
};

const redirectToAccountPage = () => {
	if (isBuildTargetWeb) {
		window.location.href = URL_ACCOUNT_PAGE;
	} else {
		window.open(URL_ACCOUNT_PAGE, "_blank");
	}
};

const UserContainer = ({ userContainerRef, toggleUserContainer, ...props }) => (
	<div
		className={`user-container ${props.plan ? "has-plus" : ""}`}
		ref={userContainerRef}
	>
		<div className="user" title={props.email}>
			<div className="user-row" onClick={toggleUserContainer}>
				<div className="user-avatar-wrapper">
					<div className="user-avatar">
						<img
							className="user-avatar-img"
							src={props.profilePictureUrl ?? defaultAvatarBase64Source}
						/>
						<div className="user-badge-wrapper">
							<span className="badge badge-plus">PLUS</span>
							<span className="badge badge-team">TEAM</span>
						</div>
					</div>
				</div>
				<span className="user-name-wrapper">
					<span className="user-info-name">{props.displayName}</span>
					<span className="anim-caret">
						{caretLeft}
						{caretRight}
					</span>
				</span>
			</div>
			<div className="user-nav-desktop">
				<ul className="user-nav">
					<li className="action action-profile" onClick={redirectToAccountPage}>
						Profile
					</li>
					<li className="action action-logout" onClick={props.logOutUser}>
						Log Out
					</li>
				</ul>
				<div className="user-close"></div>
			</div>
			<div className="user-nav-mobile">
				<nav className="user-nav dropdown nipple nipple-top-right">
					<ul className="dropdown-list">
						<li
							className="dropdown-list-item action action-profile"
							onClick={redirectToAccountPage}
						>
							Profile
						</li>
						<li
							className="dropdown-list-item action action-logout"
							onClick={props.logOutUser}
						>
							Log Out
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
);

const ContextMemo = memo((props) => {
	const userContainerRef = useRef(null);

	FocusOutHandler({ ref: userContainerRef, callback: hideUserNav });

	const toggleUserContainer = () => toggleRefClassName(userContainerRef, OPEN);

	const { activeNav, toggleSettingsApp, toggleViewContainer, ...rest } = props;
	const isLoggedIn = !!props.email;

	const LogInButton = () => (
		<div className="settings-nav-user">
			<div className="user login">
				<div className="button login-button" onClick={loginButtonClickHander}>
					<div className="login-title">
						Log In<span className="slash"> / </span>Sign up
					</div>
					<div className="login-description">Sync your account</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="settings-nav-header">
			<div className="settings-nav-chooser" onClick={toggleViewContainer}>
				<span className="settings-nav-active">{activeNav}</span>
				{angleDownIcon}
			</div>
			<div className="settings-nav-user">
				{isLoggedIn ? (
					<UserContainer
						{...{ userContainerRef, toggleUserContainer, ...rest }}
					/>
				) : (
					<LogInButton />
				)}
			</div>
			<span className="mobile-close">
				<span
					className="icon-wrapper u--mobile-show-bg hide"
					onClick={toggleSettingsApp}
				>
					{hideIcon}
				</span>
			</span>
		</div>
	);
});

export const UserActions = (props) => {
	const {
		storageUserCustomization: { displayName },
	} = useUserCustomization();
	const {
		storageAuth: {
			email,
			profilePictureUrl,
			subscriptionSummary: { plan },
		},
	} = useAuth();
	const { logOutUser } = useAuthActions();

	return (
		<ContextMemo
			{...props}
			{...{ displayName, email, plan, profilePictureUrl, logOutUser }}
		/>
	);
};
