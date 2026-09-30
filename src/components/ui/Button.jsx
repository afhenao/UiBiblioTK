import { CircleNotch } from "@phosphor-icons/react/CircleNotch";
import { cn } from "../../utils/cn.js";

// Estilos en Button.css: variantes primary, accent, outline, ghost y danger; tamaños sm, md y lg
export function buttonClasses({
	variant = "primary",
	size = "md",
	className,
} = {}) {
	return cn(
		"btk-button",
		`btk-button--${variant}`,
		`btk-button--${size}`,
		className,
	);
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
				<CircleNotch aria-hidden="true" className="btk-button__spinner" />
			)}
			{children}
			{trailingIcon && !loading && (
				<span aria-hidden="true" className="btk-button__icon">
					{trailingIcon}
				</span>
			)}
		</button>
	);
}

export default Button;
