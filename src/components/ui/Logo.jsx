import { cn } from "../../utils/cn.js";

function Logo({ tone = "dark", hideWordmarkOnMobile = false, className }) {
	const isLight = tone === "light";

	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			<span
				aria-hidden="true"
				className={cn(
					"grid size-9 shrink-0 place-items-center rounded-full border-2 font-display text-[13px] font-extrabold tracking-[-0.02em]",
					isLight
						? "border-honey-400 text-honey-300"
						: "border-honey-600 text-honey-700",
				)}
			>
				BT
			</span>
			<span
				className={cn(
					"font-display text-[1.375rem] font-extrabold tracking-[-0.045em]",
					isLight ? "text-sand-50" : "text-pine-950",
					hideWordmarkOnMobile && "max-sm:sr-only",
				)}
			>
				BiblioTK
			</span>
		</span>
	);
}

export default Logo;
