import React, { lazy, memo, Suspense, useState, useEffect } from "react";
import { HeightResizeWrapper, MoreToggleWrapper } from "../../components";
import { useUserCustomization } from "../../hooks";
import { ONE_MINUTE, getGreetingMessage, toMilliseconds } from "../../utils";

const Loading = () => (
	<div className="dropdown more-dropdown app dash-dropdown dropdown-hide nipple nipple-top-left">
		<ul data-v-c8d4d4da className="dropdown-list">
			<li className="dropdown-list-item">
				<div className="dropdown-list-label-wrapper">
					<span className="dropdown-list-label">
						<i className="loading-icon"></i>
						Loading...
					</span>
				</div>
			</li>
		</ul>
	</div>
);

const Settings = lazy(() => import("./Settings/Settings"));

const ContextMemo = memo(({ displayName, displayNameVisible }) => {
	const [greetingMessage, setGreetingMessage] = useState(
		getGreetingMessage(displayNameVisible, displayName),
	);
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => {
		const greetingInterval = setInterval(() => {
			setGreetingMessage(getGreetingMessage(displayNameVisible, displayName));
		}, toMilliseconds(ONE_MINUTE));

		return () => clearInterval(greetingInterval);
	}, []);

	const toggleSettingsApp = () => setComponentDidMount(true);

	return (
		<HeightResizeWrapper>
			<div
				className="has-3-col app-container has-dash-icon greeting"
				data-v-d6260d64
			>
				<div className="side-col left" data-v-d6260d64></div>
				<div className="center-col" data-v-d6260d64>
					<span className="content">
						<span className="message">{greetingMessage}</span>
						<span className="name-punctuation-no-wrap">
							<span id="name-wrapper" className="name-wrapper">
								<span className="name" data-v-4e331ed7>
									{displayNameVisible && displayName}
								</span>
							</span>
							<span>.</span>
						</span>
					</span>
				</div>
				<div className="side-col right" data-v-d6260d64>
					<MoreToggleWrapper onToggle={toggleSettingsApp}>
						{componentDidMount && (
							<Suspense fallback={<Loading />}>
								<Settings />
							</Suspense>
						)}
					</MoreToggleWrapper>
				</div>
			</div>
		</HeightResizeWrapper>
	);
});

export const GreetingMantra = () => {
	const { storageUserCustomization } = useUserCustomization();
	const { displayName, displayNameVisible, greetingVisible } =
		storageUserCustomization;

	return (
		<>
			{greetingVisible && (
				<ContextMemo {...{ displayName, displayNameVisible }} />
			)}
		</>
	);
};
