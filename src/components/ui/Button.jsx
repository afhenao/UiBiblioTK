import { CircleNotch } from "@phosphor-icons/react";
import { cn } from "../../utils/cn.js";

const baseClasses =
	"group inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variantClasses = {
	primary:
		"bg-pine-900 text-sand-50 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_12px_24px_-14px_rgb(11_34_28/0.7)] hover:bg-pine-800",
	accent:
		"bg-honey-400 text-pine-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] hover:bg-honey-300",
	outline:
		"bg-transparent text-pine-900 shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-pine-900/5",
	ghost: "bg-sand-50/10 text-sand-50 hover:bg-sand-50/15",
	danger:
		"bg-clay-600 text-sand-50 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_12px_24px_-14px_rgb(134_51_31/0.7)] hover:bg-clay-700",
};

const iconWellClasses = {
	primary: "bg-sand-50/10 text-honey-300",
	accent: "bg-pine-950/10 text-pine-950",
	outline: "bg-pine-900/5 text-pine-900",
	ghost: "bg-sand-50/10 text-sand-50",
	danger: "bg-sand-50/15 text-sand-50",
};

const sizeClasses = {
	sm: "h-10 px-4 text-sm",
	md: "h-12 px-5 text-[15px]",
	lg: "h-14 px-6 text-base",
};

export function buttonClasses({
	variant = "primary",
	size = "md",
	className,
} = {}) {
	return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

function Button({
	variant = "primary",
	size = "md",
	loading = false,
	trailingIcon,
	className,
	children,
	type = "button",
	disabled,
	...props
}) {
	return (
		<button
			type={type}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			className={buttonClasses({ variant, size, className })}
			{...props}
		>
			{loading && (
				<CircleNotch
					aria-hidden="true"
					className="size-[18px] animate-[spin_700ms_linear_infinite]"
				/>
			)}
			{children}
			{trailingIcon && !loading && (
				<span
					aria-hidden="true"
					className={cn(
						"-mr-3 grid size-9 place-items-center rounded-full transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5",
						iconWellClasses[variant],
					)}
				>
					{trailingIcon}
				</span>
			)}
		</button>
	);
}

export default Button;
