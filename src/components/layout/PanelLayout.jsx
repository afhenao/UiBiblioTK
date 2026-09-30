import { SignOut } from "@phosphor-icons/react/SignOut";
import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo.jsx";

function PanelLayout({
	navItems = [],
	homePath = "/",
	navLabel = "Secciones del panel",
	userLabel,
	onLogout,
	children,
}) {
	return (
		<div className="btk-panel">
			<a href="#contenido" className="btk-skip-link">
				Saltar al contenido
			</a>
			<header className="btk-panel__header">
				<div className="btk-panel__bar">
					<NavLink to={homePath} className="btk-panel__home">
						<Logo tone="light" hideWordmarkOnMobile />
					</NavLink>
					{navItems.length > 0 && (
						<nav aria-label={navLabel} className="btk-panel__nav">
							{/* La sección activa se marca con aria-current="page" (lo pone NavLink) */}
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									end={item.end}
									className="btk-panel__link"
								>
									{item.label}
								</NavLink>
							))}
						</nav>
					)}
					<div className="btk-panel__user">
						{userLabel && (
							<span className="btk-panel__user-label">{userLabel}</span>
						)}
						<button
							type="button"
							onClick={onLogout}
							className="btk-panel__logout"
						>
							<SignOut aria-hidden="true" className="btk-panel__logout-icon" />
							<span className="btk-panel__logout-label">Cerrar sesión</span>
						</button>
					</div>
				</div>
			</header>
			<main id="contenido" className="btk-panel__main">
				{children}
			</main>
		</div>
	);
}

export default PanelLayout;
