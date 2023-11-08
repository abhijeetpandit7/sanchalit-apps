import React, { memo, useEffect, useRef, useState } from "react";
import moment from "moment";
import {
	ACTIVE,
	ONE_MINUTE,
	QUOTES,
	QUOTE_LIST,
	heartIcon,
	skipIcon,
	twitterIcon,
	getInstantDate,
	randomElement,
	toMilliseconds,
	toggleRefClassName,
} from "../../utils";

const shareHandler =
	({ body, source }) =>
	() => {
		const twitterHandle = "sanchalitdash";
		const content = `"${body}" —${source} #motivation`;
		const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			content,
		)}&via=${twitterHandle}&related=${twitterHandle}`;

		const width = 545;
		const height = 420;
		const left = window.screen.width / 2 - 272.5;
		const top = window.screen.height / 2 - 210;

		window.open(
			twitterIntentUrl,
			"share",
			`width=${width}, height=${height}, left=${left}, top=${top}, resizeable=0`,
		);
	};

const getActiveQuote = (quotes) =>
	quotes.find((quote) =>
		moment(quote.forDate).isSame(moment(getInstantDate()), "day"),
	) ||
	(quotes.length &&
		quotes.sort((a, b) => moment(b.forDate) - moment(a.forDate))[0]) ||
	randomElement(QUOTE_LIST);

const ContextMemo = memo(
	({ hasPlus, quotes, setWidgetReady, skipQuote, toggleQuoteFavourite }) => {
		const heartIconRef = useRef(null);
		const [activeQuote, setActiveQuote] = useState(getActiveQuote(quotes));

		useEffect(() => {
			let quoteInterval;
			if (quotes.length) {
				quoteInterval = setInterval(
					() => setActiveQuote(getActiveQuote(quotes)),
					toMilliseconds(ONE_MINUTE),
				);
				setActiveQuote(getActiveQuote(quotes));
			}
			setWidgetReady({ widget: QUOTES });

			return () => clearInterval(quoteInterval);
		}, [quotes]);

		const toggleFavouriteQuote = () => {
			const isFavourite = toggleRefClassName(heartIconRef, ACTIVE);
			activeQuote.id && toggleQuoteFavourite(activeQuote.id, isFavourite);
		};

		return (
			<div className="app-container quote">
				<div className="app-dash">
					<p className="body">
						<span className="body-text">{`“${activeQuote.body}”`}</span>
						<span className="below u--touch-hide">
							<span className="source" data-v-f7053094>
								{activeQuote.source}
							</span>
							<span
								title={`${
									activeQuote.isFavourite ? "Unfavourite" : "Favourite"
								}`}
								className={`control favorite ${
									activeQuote.isFavourite ? ACTIVE : ""
								}`}
								onClick={toggleFavouriteQuote}
								ref={heartIconRef}
								data-v-1040273e
							>
								{heartIcon}
							</span>
							<span
								title="Skip"
								className="control skip"
								onClick={() => skipQuote(hasPlus)}
								data-v-1040273e
							>
								{skipIcon}
							</span>
							<span
								title="Share"
								className="control"
								onClick={shareHandler(activeQuote)}
								data-v-1040273e
							>
								{twitterIcon}
							</span>
						</span>
					</p>
				</div>
			</div>
		);
	},
);

export default ContextMemo;
