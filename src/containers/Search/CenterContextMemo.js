import React, { memo } from "react";
import { Form } from "./Form/Form";

const CenterContextMemo = memo((props) => (
	<div className="has-3-col has-dash-icon big-search-wrapper" data-v-d6260d64>
		<div className="side-col left"></div>
		<div className="center-col" data-v-d6260d64>
			<div className="big search app-container hide-apps-no-fade">
				<Form {...props} />
				<div className="backdrop-filter hide-apps-fade"></div>
			</div>
		</div>
		<div className="side-col right"></div>
	</div>
));

export default CenterContextMemo;
