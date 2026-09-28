import { CheckCircle, Info, WarningCircle } from "@phosphor-icons/react";
import { cn } from "../../utils/cn.js";

const tones = {
	error: {
		icon: WarningCircle,
		className:
			"bg-clay-50 text-clay-700 shadow-[inset_0_0_0_1px_rgb(163_64_47/0.18)]",
	},
	info: {
		icon: Info,
		className:
			"bg-honey-100 text-honey-700 shadow-[inset_0_0_0_1px_rgb(168_112_44/0.2)]",
	},
	success: {
		icon: CheckCircle,
		className:
			"bg-pine-50 text-pine-800 shadow-[inset_0_0_0_1px_rgb(47_93_78/0.18)]",
	},
};

function Alert({ tone = "error", className, children }) {
	const { icon: Icon, className: toneClassName } = tones[tone];

	return (
		<div
			role={tone === "error" ? "alert" : "status"}
			className={cn(
				"flex items-start gap-3 rounded-2xl px-4 py-3 text-[13px] font-medium leading-snug motion-safe:animate-rise-sm",
				toneClassName,
				className,
			)}
		>
			<Icon aria-hidden="true" className="mt-px size-[18px] shrink-0" />
			<div>{children}</div>
		</div>
	);
}

export default Alert;
