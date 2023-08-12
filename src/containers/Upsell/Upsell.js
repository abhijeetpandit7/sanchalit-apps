import React, { memo } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";
import {
	diamondsIcon,
	hideIcon1,
	UPSELL_PLUS_GATE,
	URL_ROOT_DOMAIN,
	UPSELL_LIST,
} from "../../utils";

const Header = ({ upsellKey, closeUpsell }) => (
	<header className="header" data-v-8fea4e86>
		<div className="header-left" data-v-8fea4e86></div>
		<div className="header-title" data-v-8fea4e86>
			{upsellKey === UPSELL_PLUS_GATE
				? "Get Sanchalit plus today"
				: "Available on Sanchalit Plus"}
		</div>
		<div className="header-right" data-v-8fea4e86>
			<span className="icon-wrapper hide" data-v-8fea4e86 onClick={closeUpsell}>
				{hideIcon1}
			</span>
		</div>
	</header>
);

const BodyHeader = ({ title, description }) => (
	<div className="body-header" data-v-8fea4e86>
		<div className="title" data-v-8fea4e86>
			{title}
		</div>
		<div className="description" data-v-8fea4e86>
			{description}
		</div>
	</div>
);

const Features = ({ features }) => (
	<ul className="features" data-v-40063032>
		{features.map(({ title, description, icon }) => (
			<li data-v-40063032 key={title}>
				{icon}
				<div className="feature-title" data-v-40063032>
					{title}
				</div>
				<div className="feature-desc" data-v-40063032>
					{description}
				</div>
			</li>
		))}
	</ul>
);

const Footer = () => (
	<footer className="footer" data-v-8fea4e86>
		<a className="button" data-v-8fea4e86>
			{diamondsIcon}
			Get Sanchalit Plus
		</a>
		<div className="button-desc" data-v-8fea4e86>
			Only $1.99/month.
			<a href={URL_ROOT_DOMAIN} target="_blank">
				<strong> Learn more</strong>
			</a>
		</div>
	</footer>
);

const ContextMemo = memo(({ app, setUpsellApp }) => {
	const currentUpsell = UPSELL_LIST.find(({ key }) => key === app);

	const closeUpsell = () => setUpsellApp(null);

	return (
		<div
			className="app-container overlay modal-component has-reveal reveal"
			data-v-8fea4e86
			data-v-40063032
			data-v-6e1d3a80
		>
			<div className="app new-upsell" data-v-8fea4e86>
				<Header {...{ upsellKey: currentUpsell.key, closeUpsell }} />
				<main className="body" data-v-8fea4e86>
					<BodyHeader {...currentUpsell.header} />
					<div className="content" data-v-40063032>
						<Features features={currentUpsell.features} />
					</div>
				</main>
				<Footer />
			</div>
		</div>
	);
});

export const Upsell = () => {
	const { setUpsellApp } = useUserActions();
	const { widgetManager } = useUserCustomization();
	const { app } = widgetManager.upsell;

	return app !== null && <ContextMemo {...{ app, setUpsellApp }} />;
};
