import { WarningCircle } from "@phosphor-icons/react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";

export const inputClasses =
	"h-12 w-full rounded-xl border-0 bg-sand-50 px-4 text-[15px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] duration-150 ease-out-strong placeholder:text-ink-faint hover:shadow-[inset_0_0_0_1px_var(--color-pine-700)] focus:shadow-[inset_0_0_0_2px_var(--color-pine-700),0_0_0_4px_var(--color-pine-100)] aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-clay-600),0_0_0_4px_var(--color-clay-50)]";

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
		<div className={cn("grid content-start gap-2", className)}>
			<label
				htmlFor={fieldId}
				className="text-[13px] font-semibold text-pine-900"
			>
				{label}
			</label>
			<div className="relative">
				<input
					id={fieldId}
					aria-invalid={error ? true : undefined}
					aria-describedby={hasMessage ? messageId : undefined}
					className={cn(inputClasses, endAdornment && "pr-12", inputClassName)}
					{...inputProps}
				/>
				{endAdornment && (
					<div className="absolute inset-y-0 right-1.5 flex items-center">
						{endAdornment}
					</div>
				)}
			</div>
			{error && (
				<p
					id={messageId}
					className="flex items-start gap-1.5 text-[13px] font-medium text-clay-600 motion-safe:animate-rise-sm"
				>
					<WarningCircle aria-hidden="true" className="mt-px size-4 shrink-0" />
					{error}
				</p>
			)}
			{hint && !error && (
				<p id={messageId} className="text-[13px] text-ink-soft">
					{hint}
				</p>
			)}
		</div>
	);
}

export default TextField;
