import { cn } from "../../utils/cn.js";
import Logo from "../ui/Logo.jsx";

// Titular grande del panel verde (la app arma el <h1> y lo pasa en `headline`)
export const authHeadlineClasses = "btk-auth-headline";

function AuthLayout({ headline, description, width = "narrow", children }) {
	return (
		<div className="btk-auth">
			<aside className="btk-auth__aside">
				<div aria-hidden="true" className="btk-auth__ring" />
				<Logo tone="light" className="btk-auth__logo" />
				<div className="btk-auth__intro">
					<div className="btk-auth__headline">{headline}</div>
					{description && (
						<p className="btk-auth__description">{description}</p>
					)}
				</div>
			</aside>
			<main className="btk-auth__main">
				<div
					className={cn(
						"btk-auth__content",
						width === "wide" && "btk-auth__content--wide",
					)}
				>
					{children}
				</div>
			</main>
		</div>
	);
}

export default AuthLayout;
