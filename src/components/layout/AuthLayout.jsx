import { cn } from "../../utils/cn.js";
import Logo from "../ui/Logo.jsx";

export const authHeadlineClasses =
	"font-display text-[clamp(2.5rem,5.4vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-sand-50";

function AuthLayout({ headline, description, width = "narrow", children }) {
	return (
		<div className="min-h-dvh bg-sand-100 p-3 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
			<aside className="grain relative flex min-h-[21rem] flex-col justify-between overflow-hidden rounded-[28px] bg-pine-900 p-7 text-sand-50 md:sticky md:top-3 md:h-[calc(100dvh-1.5rem)] md:min-h-[36rem] md:p-12">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-28 -bottom-32 size-[24rem] rounded-full border border-honey-400/35 shadow-[0_0_0_44px_rgb(217_165_90/0.06),0_0_0_88px_rgb(217_165_90/0.04)] md:size-[36rem]"
				/>
				<Logo tone="light" className="relative" />
				<div className="relative mt-14 md:mt-0">
					<div className="motion-safe:animate-rise">{headline}</div>
					{description && (
						<p className="mt-5 max-w-sm text-base leading-relaxed text-pine-200 motion-safe:animate-rise [animation-delay:80ms]">
							{description}
						</p>
					)}
				</div>
			</aside>
			<main className="flex justify-center px-2 py-10 md:items-center md:px-8 md:py-12">
				<div
					className={cn(
						"w-full",
						width === "wide" ? "max-w-[34rem]" : "max-w-[26rem]",
					)}
				>
					{children}
				</div>
			</main>
		</div>
	);
}

export default AuthLayout;
