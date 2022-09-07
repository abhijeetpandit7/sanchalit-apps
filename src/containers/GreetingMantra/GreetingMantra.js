import React, { memo, useState, useEffect } from "react";
import { HeightResizeWrapper, MoreToggleWrapper } from "../../components";
import { useUserCustomization } from "../../hooks";
import { ONE_MINUTE, getGreetingMessage, toMilliseconds } from "../../utils";

const TEST_USER_NAME = "Abhijeet";

const ContextMemo = memo(() => {
	const [greetingMessage, setGreetingMessage] = useState(
		getGreetingMessage(TEST_USER_NAME),
	);

	useEffect(() => {
		const greetingInterval = setInterval(() => {
			setGreetingMessage(getGreetingMessage(TEST_USER_NAME));
		}, toMilliseconds(ONE_MINUTE));

		return () => clearInterval(greetingInterval);
	}, []);

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
								<span className="name" data-v-4e331ed7>
									{TEST_USER_NAME}
								</span>
							</span>
							<span>.</span>
						</span>
					</span>
				</div>
				<div className="side-col right" data-v-d6260d64>
					<MoreToggleWrapper />
				</div>
			</div>
		</HeightResizeWrapper>
	);
});

export const GreetingMantra = () => {
	const { storageUserCustomization } = useUserCustomization();
	const { greetingVisible } = storageUserCustomization;

	return <>{greetingVisible && <ContextMemo />}</>;
};
