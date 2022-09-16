import React, { memo } from "react";
import { useUserActions } from "../../../hooks";
import {
	SEARCH_PROVIDER_LIST,
	bingColouredIcon,
	duckDuckGoColouredIcon,
	ecosiaColouredIcon,
	googleColouredIcon,
} from "../../../utils";

const ContextMemo = memo((props) => (
	<div
		className="dropdown more-dropdown app dash-dropdown nipple nipple-top-left"
		data-v-c8d4d4da
	>
		<ul className="dropdown-list" data-v-c8d4d4da>
			<div data-v-5077f7de>
				<div className="heading" data-v-5077f7de>
					Search with
				</div>
				{SEARCH_PROVIDER_LIST.map(({ name, colouredIconKey }) => (
					<li
						key={name}
						className="dropdown-list-item search-provider active"
						onClick={() => props.setSearchProvider(name)}
						data-v-5077f7de
					>
						<div className="dropdown-list-label-wrapper">
							<span className="dropdown-list-icon-wrapper">
								{props[colouredIconKey]}
							</span>
							<span className="dropdown-list-label">{name}</span>
						</div>
					</li>
				))}
			</div>
		</ul>
	</div>
));

const Dropdown = () => {
	const { setSearchProvider } = useUserActions();

	return (
		<ContextMemo
			{...{
				bingColouredIcon,
				duckDuckGoColouredIcon,
				ecosiaColouredIcon,
				googleColouredIcon,
				setSearchProvider,
			}}
		/>
	);
};

export default Dropdown;
