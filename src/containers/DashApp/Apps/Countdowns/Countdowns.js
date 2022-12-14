import React, { lazy, Suspense, useState } from "react";
import { ARCHIVE, ADD, EDIT, HOME } from "../../../../utils";

const Home = lazy(() => import("./Home/Home"));
const Add = lazy(() => import("./Add/Add"));

const Countdowns = () => {
	const [activeView, setActiveView] = useState(HOME);

	const COMPONENT_VIEW_LIST = [
		{
			name: HOME,
			component: <Home {...{ setActiveView }} />,
		},
		{
			name: ARCHIVE,
			component: <Home {...{ archive: true, setActiveView }} />,
		},
		{
			name: ADD,
			component: <Add {...{ setActiveView }} />,
		},
		{
			name: EDIT,
			component: <Add {...{ edit: true, setActiveView }} />,
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
