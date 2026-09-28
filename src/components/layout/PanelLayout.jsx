import { SignOut } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn.js";
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
		<div className="min-h-dvh bg-sand-100">
			<a
				href="#contenido"
				className="sr-only rounded-full bg-pine-900 px-4 py-2 text-sm font-semibold text-sand-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
			>
				Saltar al contenido
			</a>
			<header className="sticky top-0 z-40 bg-linear-to-b from-sand-100 from-60% to-sand-100/0 px-3 pt-3 pb-4">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 rounded-full bg-pine-900 py-2 pr-2 pl-3 text-sand-50 shadow-[0_18px_40px_-24px_rgb(11_34_28/0.6)] sm:pl-5">
					<NavLink to={homePath} className="rounded-full">
						<Logo tone="light" hideWordmarkOnMobile />
					</NavLink>
					{navItems.length > 0 && (
						<nav
							aria-label={navLabel}
							className="flex items-center gap-1 rounded-full bg-pine-950/50 p-1"
						>
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									end={item.end}
									className={({ isActive }) =>
										cn(
											"rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 sm:px-4",
											isActive
												? "bg-sand-50 text-pine-950"
												: "text-pine-200 hover:text-sand-50",
										)
									}
								>
									{item.label}
								</NavLink>
							))}
						</nav>
					)}
					<div className="flex items-center gap-3">
						{userLabel && (
							<span className="hidden max-w-56 truncate text-sm text-pine-200 lg:block">
								{userLabel}
							</span>
						)}
						<button
							type="button"
							onClick={onLogout}
							className="inline-flex h-12 items-center gap-2 rounded-full bg-sand-50/10 px-3.5 text-sm font-semibold text-sand-50 transition-[background-color,transform] duration-150 ease-out-strong hover:bg-sand-50/15 active:scale-[0.97] sm:px-4"
						>
							<SignOut aria-hidden="true" className="size-[18px]" />
							<span className="max-sm:sr-only">Cerrar sesión</span>
						</button>
					</div>
				</div>
			</header>
			<main
				id="contenido"
				className="mx-auto w-full max-w-6xl px-4 pt-8 pb-20 md:px-8 md:pt-14"
			>
				{children}
			</main>
		</div>
	);
}

export default PanelLayout;
