import { SignOut } from "@phosphor-icons/react";
import Button from "../ui/Button.jsx";
import Logo from "../ui/Logo.jsx";

function ReaderLayout({ onLogout, children }) {
	return (
		<div className="min-h-dvh bg-sand-100">
			<header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-8">
				<Logo />
				<Button variant="outline" size="sm" onClick={onLogout}>
					<SignOut aria-hidden="true" className="size-4" />
					Cerrar sesión
				</Button>
			</header>
			<main className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
				{children}
			</main>
		</div>
	);
}

export default ReaderLayout;
