import { CheckCircle } from "@phosphor-icons/react/CheckCircle";
import { Info } from "@phosphor-icons/react/Info";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";
import { cn } from "../../utils/cn.js";

const toneIcons = {
	error: WarningCircle,
	info: Info,
	success: CheckCircle,
};

function Alert({ tone = "error", className, children }) {
	const Icon = toneIcons[tone];

	return (
		<div
			role={tone === "error" ? "alert" : "status"}
			className={cn("btk-alert", `btk-alert--${tone}`, className)}
		>
			<Icon aria-hidden="true" className="btk-alert__icon" />
			<div>{children}</div>
		</div>
	);
}

export default Alert;
