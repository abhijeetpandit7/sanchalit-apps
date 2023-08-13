import React, { memo } from "react";
import { useAuth, useUserActions } from "../../../hooks";
import {
	ACTIVE,
	UPSELL_PLUS_GATE,
	UPSELL_UPGRADE_PLUS,
	SETTINGS_NAV_LIST,
} from "../../../utils";

const ContextMemo = memo((props) => {
	const hasPlus = !!props.plan;

	const handleClick = (navItem) => {
		if (navItem.clickOnly) {
			switch (navItem.command) {
				case UPSELL_UPGRADE_PLUS: {
					props.setUpsellApp(UPSELL_PLUS_GATE);
					break;
				}
				default:
					break;
			}
		} else {
			props.setActiveNav(navItem.value);
		}
		props.hideViewContainer();
	};

	return (
		<nav id="nav-menu" className="settings-nav">
			<div className="settings-nav-list">
				{SETTINGS_NAV_LIST.filter((navItem) =>
					navItem.nonPlusOnly ? hasPlus === false : true,
				).map((navItem, navItemIndex) => {
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
							onClick={() => handleClick(navItem)}
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
});

export const Navbar = (props) => {
	const {
		storageAuth: {
			subscriptionSummary: { plan },
		},
	} = useAuth();
	const { setUpsellApp } = useUserActions();

	return <ContextMemo {...props} {...{ plan, setUpsellApp }} />;
};
