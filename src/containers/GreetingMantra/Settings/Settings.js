import React, { memo } from "react";
import { useUserActions,useUserCustomization } from "../../../hooks";

const ContextMemo = memo(
	({
		displayName,
		displayNameVisible,
		setStorageUserCustomization,
		editDisplayName,
	}) => {
		const toggleDisplayNameVisible = () =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayNameVisible: !prevCustomization.displayNameVisible,
			}));

		return (
			<div
				data-v-c8d4d4da
				className="dropdown more-dropdown app dash-dropdown dropdown-hide nipple nipple-top-left"
			>
				<ul data-v-c8d4d4da className="dropdown-list">
					<li className="dropdown-list-item" onClick={editDisplayName}>
						<div className="dropdown-list-label-wrapper">
							<span className="dropdown-list-label">{`${
								displayName ? `Edit` : `Add`
							} your name`}</span>
						</div>
					</li>
					{displayName && (
						<>
							<li className="line" />
							<li
								className="dropdown-list-item"
								onClick={toggleDisplayNameVisible}
							>
								<div className="dropdown-list-label-wrapper">
									<span className="dropdown-list-label">{`${
										displayNameVisible ? `Hide` : `Show`
									} your name`}</span>
								</div>
							</li>
						</>
					)}
				</ul>
			</div>
		);
	},
);

const Settings = () => {
	const {
		storageUserCustomization: { displayName, displayNameVisible },
		setStorageUserCustomization,
		
	} = useUserCustomization();
	const { editDisplayName } = useUserActions();

	return (
		<ContextMemo
			{...{
				displayName,
				displayNameVisible,
				setStorageUserCustomization,
				editDisplayName,
			}}
		/>
	);
};

// Memoized to prevent re-render on every setGreetingMessage
export default memo(Settings);
