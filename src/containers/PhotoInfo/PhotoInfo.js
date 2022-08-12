import React from "react";
import { heartIcon, skipIcon } from "../../utils";

export const PhotoInfo = () => {
	return (
		<div className="app-container photo-info">
			<div className="app-dash">
				<div className="title" data-v-1040273e>Phuket, Thailand</div>
				<div className="source" data-v-1040273e>
					<span className="source-link">Cody Wilson</span>
					<span>
						<span title="Favorite" className="favorite control">
							{heartIcon}
						</span>
						<span title="Skip" className="skip control">
							{skipIcon}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};
