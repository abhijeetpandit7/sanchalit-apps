import React, { lazy, Suspense, useState } from "react";
import { ADD, HOME } from "../../../../utils";

const Home = lazy(() => import("./Home/Home"));
const Add = lazy(() => import("./Add/Add"));

const Countdowns = ({ hour12clock, countdowns, saveCountdown }) => {
	const [activeView, setActiveView] = useState(ADD);

	const COMPONENT_VIEW_LIST = [
		{ name: HOME, component: <Home {...{ countdowns, setActiveView }} /> },
		{
			name: ADD,
			component: <Add {...{ hour12clock, saveCountdown, setActiveView }} />,
		},
	];

	return (
		<div data-v-0f8972b1>
			<div className="app-overflow" data-v-d653fa6c data-v-0f8972b1>
				<Suspense fallback={null}>
					{
						COMPONENT_VIEW_LIST.find(({ name }) => name === activeView)
							.component
					}
				</Suspense>
			</div>
		</div>
	);
};

export default Countdowns;
