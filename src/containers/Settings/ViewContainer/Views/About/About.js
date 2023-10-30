import React, { memo } from "react";
import { useAuth, useAuthActions, useUserActions } from "../../../../../hooks";
import { brandLogo, ON_TRIAL } from "../../../../../utils";

const ContextMemo = memo(
	({ plan, setSubscriptionSummary, toggleOnPlusAddOns }) => {
		const hasPlus = !!plan;

		const handleMagicClick = async (event) => {
			if (hasPlus) return;
			switch (event.detail) {
				case 3: {
					await setSubscriptionSummary({ plan: ON_TRIAL });
					await toggleOnPlusAddOns();
					alert(
						"We've unlocked our premium dashboard features to help you get more organized, motivated, and focused to beat distractions!",
					);
				}
			}
		};

		return (
			<div id="settings-about" className="settings-view settings-about">
				<div className="logo logo-white" onClick={handleMagicClick}>
					{brandLogo}
				</div>
				<h3>Sanchalit</h3>
				<p className="made">
					<span className="version">v{process.env.VERSION}</span>
				</p>

				<p className="thanks">Thank you for your support!</p>

				<p className="links">
					{/* <a href="" target="_blank">
					<span className="link-name">Feedback</span>
				</a> */}
				</p>

				<div className="footer">
					<span className="footer-made">
						Made with <span className="heart">♥</span> in India
					</span>
					<span className="separator"></span>
					<span className="footer-links">
						{/* <a href="" target="_blank">
						Terms &amp; Privacy
					</a> */}
					</span>
				</div>
			</div>
		);
	},
);

const About = () => {
	const {
		storageAuth: {
			subscriptionSummary: { plan },
		},
	} = useAuth();
	const { setSubscriptionSummary } = useAuthActions();
	const { toggleOnPlusAddOns } = useUserActions();

	return (
		<ContextMemo {...{ plan, setSubscriptionSummary, toggleOnPlusAddOns }} />
	);
};

export default About;
