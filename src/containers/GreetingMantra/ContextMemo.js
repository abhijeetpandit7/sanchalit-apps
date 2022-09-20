import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { HeightResizeWrapper, MoreToggleWrapper } from "../../components";
import {
	GREETING,
	ONE_MINUTE,
	getGreetingMessage,
	toMilliseconds,
} from "../../utils";

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

const ContextMemo = memo(
	({
		displayName,
		displayNameRef,
		displayNameVisible,
		editDisplayName,
		setWidgetReady,
	}) => {
		const [greetingMessage, setGreetingMessage] = useState(
			getGreetingMessage(displayNameVisible, displayName),
		);
		const [componentDidMount, setComponentDidMount] = useState(false);

		useEffect(() => {
			const greetingInterval = setInterval(() => {
				setGreetingMessage(getGreetingMessage(displayNameVisible, displayName));
			}, toMilliseconds(ONE_MINUTE));
			setGreetingMessage(getGreetingMessage(displayNameVisible, displayName));
			setWidgetReady({ widget: GREETING });

			return () => clearInterval(greetingInterval);
		}, [displayName, displayNameVisible]);

		const displayNameClickHandler = (event) => {
			switch (event.detail) {
				case 2:
					editDisplayName();
				default:
					return;
			}
		};

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
								<span className="name-wrapper">
									<span
										className="name"
										ref={displayNameRef}
										onClick={displayNameClickHandler}
										data-v-4e331ed7
									>
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
	},
);

export default ContextMemo;
