import { cn } from "../../utils/cn.js";

function Logo({ tone = "dark", hideWordmarkOnMobile = false, className }) {
	return (
		<span
			className={cn(
				"btk-logo",
				tone === "light" && "btk-logo--light",
				className,
			)}
		>
			<span aria-hidden="true" className="btk-logo__mark">
				BT
			</span>
			<span
				className={cn(
					"btk-logo__wordmark",
					hideWordmarkOnMobile && "btk-logo__wordmark--mobile-hidden",
				)}
			>
				BiblioTK
			</span>
		</span>
	);
}

export default Logo;
