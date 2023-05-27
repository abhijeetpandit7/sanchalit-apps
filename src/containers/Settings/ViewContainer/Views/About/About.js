import React from "react";
import { brandLogo } from "../../../../../utils";

const About = () => {
	return (
		<div id="settings-about" className="settings-view settings-about">
			<div className="logo logo-white">{brandLogo}</div>
			<h3>Sanchalit</h3>
			<p className="made">
				<span className="version">v{process.env.VERSION}</span>
			</p>

			<p className="thanks">Thank you for your support!</p>

			<p className="links">
				{/* <a href="" target="_blank">
					<span className="link-name">Feedback</span>
				</a> */}
			</p>

			<div className="footer">
				<span className="footer-made">
					Made with <span className="heart">♥</span> in India
				</span>
				<span className="separator"></span>
				<span className="footer-links">
					{/* <a href="" target="_blank">
						Terms &amp; Privacy
					</a> */}
				</span>
			</div>
		</div>
	);
};

export default About;
