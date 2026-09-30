import { SignOut } from "@phosphor-icons/react/SignOut";
import Button from "../ui/Button.jsx";
import Logo from "../ui/Logo.jsx";

function ReaderLayout({ onLogout, children }) {
	return (
		<div className="btk-reader">
			<header className="btk-reader__header">
				<Logo />
				<Button variant="outline" size="sm" onClick={onLogout}>
					<SignOut aria-hidden="true" className="btk-reader__logout-icon" />
					Cerrar sesión
				</Button>
			</header>
			<main className="btk-reader__main">{children}</main>
		</div>
	);
}

export default ReaderLayout;
