import { WarningCircle } from "@phosphor-icons/react/WarningCircle";
import { useId } from "react";
import { cn } from "../../utils/cn.js";

// Estilo del campo; sirve también para <select> y <textarea> (TextField.css)
export const inputClasses = "btk-input";

function TextField({
	id,
	label,
	hint,
	error,
	endAdornment,
	className,
	inputClassName,
	...inputProps
}) {
	const generatedId = useId();
	const fieldId = id ?? generatedId;
	const messageId = `${fieldId}-mensaje`;
	const hasMessage = Boolean(error || hint);

	return (
		<div className={cn("btk-field", className)}>
			<label htmlFor={fieldId} className="btk-field__label">
				{label}
			</label>
			<div className="btk-field__control">
				<input
					id={fieldId}
					aria-invalid={error ? true : undefined}
					aria-describedby={hasMessage ? messageId : undefined}
					className={cn(
						inputClasses,
						endAdornment && "btk-input--with-adornment",
						inputClassName,
					)}
					{...inputProps}
				/>
				{endAdornment && (
					<div className="btk-field__adornment">{endAdornment}</div>
				)}
			</div>
			{error && (
				<p id={messageId} className="btk-field__error">
					<WarningCircle aria-hidden="true" className="btk-field__error-icon" />
					{error}
				</p>
			)}
			{hint && !error && (
				<p id={messageId} className="btk-field__hint">
					{hint}
				</p>
			)}
		</div>
	);
}

export default TextField;
