import React from "react";
import { countdownIcon1, ellipsisIcon1, plusIcon } from "../../../../utils";

const Countdowns = () => {
	return (
		<div data-v-0f8972b1>
			<div className="app-overflow" data-v-d653fa6c data-v-0f8972b1>
				<header className="header app-header" data-v-53b21e9c data-v-d653fa6c>
					<div className="header-center" data-v-53b21e9c>
						<div className="title-wrapper" data-v-53b21e9c>
							{countdownIcon1}
							<div className="title" data-v-53b21e9c>
								Countdowns
							</div>
						</div>
					</div>
					<div className="header-right" data-v-53b21e9c>
						<div className="buttons" data-v-57e867a2 data-v-53b21e9c>
							<div data-v-57e867a2>
								<div className="icon-wrapper add" data-v-57e867a2>
									{plusIcon}
								</div>
							</div>
							<div data-v-57e867a2>
								<div
									className="dropdown-wrapper"
									data-v-407a49db
									data-v-57e867a2
								>
									<div className="icon-wrapper more-toggle" data-v-407a49db>
										{ellipsisIcon1}
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="app-body" data-v-d653fa6c>
					<div className="box-wrapper view" data-v-b9a9e05a data-v-d653fa6c>
						<div className="items-filter" data-v-b9a9e05a>
							<section className="empty" data-v-16d4966f data-v-b9a9e05a>
								<ul className="list" data-v-16d4966f>
									<li className="list-row" data-v-16d4966f></li>
									<li className="list-row" data-v-16d4966f></li>
									<li className="list-row" data-v-16d4966f></li>
								</ul>
								<div className="content" data-v-16d4966f>
									<div className="title" data-v-16d4966f>
										No countdowns yet
									</div>
									<div className="description" data-v-16d4966f>
										Add a countdown to get started
									</div>
									<button className="button" data-v-16d4966f>
										+ Add Countdown
									</button>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Countdowns;
