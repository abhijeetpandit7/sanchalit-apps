import React, { memo } from "react";
import { useUserCustomization } from "../../hooks";
import { heartIcon, skipIcon } from "../../utils";

const ContextMemo = memo(() => {
	return (
		<div className="app-container quote">
			<div className="app-dash" data-resize-sensor-id="okxvl">
				<p className="body">
					<span className="body-text">
						“If you can imagine it, you can achieve it. If you can dream it, you
						can become it.”
					</span>
					<span className="below u--touch-hide">
						<span className="source" data-v-f7053094>
							William Arthur Ward
						</span>
						<span title="Favorite" className="control favorite">
							{heartIcon}
						</span>
						<span title="Skip" className="control skip">
							{skipIcon}
						</span>
						<span title="Share" className="control control-twitter">
							<svg
								viewBox="0 0 512.004 419.042"
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-twitter"
							>
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M191.012,466.043a439.3,439.3,0,0,1-67.856-5.387C82.777,454.32,41.9,433.2,30.336,426.875L0,410.289l32.844-10.8c35.9-11.8,57.742-19.129,84.777-30.6-27.07-13.11-47.933-36.692-57.976-67.176L52,278.52l6.266.957A113.977,113.977,0,0,1,44,261.883c-12.934-19.645-19.781-43.649-18.324-64.219l1.437-20.246,12.121,4.695a113.319,113.319,0,0,1-10.98-30.777c-5.293-26.359-.863-54.363,12.476-78.852L51.289,53.1,65.41,70.062c44.66,53.649,101.227,85.473,168.363,94.79-2.742-18.9-.687-37.145,6.114-53.5,7.918-19.039,22-35.183,40.722-46.691A122.322,122.322,0,0,1,351.6,47.23c26.511,1.629,50.582,11.563,69.7,28.747,9.336-2.426,16.215-5.016,25.512-8.516,5.593-2.106,11.937-4.5,19.875-7.231l29.25-10.078-19.075,54.477c1.258-.106,2.555-.2,3.911-.254L512,102.961l-18.461,25.23c-1.059,1.446-1.328,1.856-1.7,2.422-1.488,2.242-3.34,5.032-28.68,38.867-6.344,8.473-9.512,19.508-8.922,31.079,2.246,43.968-3.148,83.75-16.043,118.234C426,351.418,407.1,379.41,382.031,401.992c-31.023,27.938-70.582,47.067-117.582,56.848A361.961,361.961,0,0,1,191.012,466.043Z"
									transform="translate(0 -47.001)"
								></path>
							</svg>
						</span>
					</span>
				</p>
			</div>
		</div>
	);
});

export const Quote = () => {
	const { storageUserCustomization } = useUserCustomization();
	const { quotesVisible } = storageUserCustomization;

	return <>{quotesVisible && <ContextMemo />}</>;
};
