import React from "react";
import { ACTIVE, SETTINGS_NAV_LIST } from "../../../utils";

export const Navbar = (props) => (
	<nav id="nav-menu" className="settings-nav">
		<div className="settings-nav-list">
			{SETTINGS_NAV_LIST.map((navItem, navItemIndex) => {
				const navItemClassArray = ["settings-nav-item"];
				if (navItem.value === props.activeNav) navItemClassArray.push(ACTIVE);
				if (navItem.secondary) {
					navItemClassArray.push("secondary");
					if (
						SETTINGS_NAV_LIST.findIndex((navItem) => navItem.secondary) ===
						navItemIndex
					)
						navItemClassArray.push("secondary-first");
				}

				return (
					<div
						className={navItemClassArray.join(" ")}
						onClick={() => {
							props.setActiveNav(navItem.value);
							props.hideViewContainer();
						}}
						key={navItemIndex}
					>
						{navItem.value}
					</div>
				);
			})}
		</div>
		{props.children}
	</nav>
);
