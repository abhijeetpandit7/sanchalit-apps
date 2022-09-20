import React, { memo } from "react";
import { Form } from "./Form/Form";

const TopContextMemo = memo((props) => (
	<div id="search" className="app-dash app-container search" data-v-c28d382a>
		<Form {...{ ...props, topRow: true }} />
	</div>
));

export default TopContextMemo;
