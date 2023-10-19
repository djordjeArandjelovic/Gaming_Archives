import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
	return (
		<div className="error-container">
			<div className="error-404">404</div>
			<div className="error-text">Oops! Page not found.</div>
			<div className="error-subtext">
				The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</div>
			<a href="/" className="go-home-btn">
				Go Home
			</a>
		</div>
	);
};

export default ErrorPage;
