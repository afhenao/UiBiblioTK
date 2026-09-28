import { Check } from "@phosphor-icons/react";
import { cn } from "../../utils/cn.js";

function Checkbox({ id, label, className, ...props }) {
	return (
		<label
			htmlFor={id}
			className={cn(
				"inline-flex cursor-pointer select-none items-center gap-2.5 text-[13px] text-pine-900",
				className,
			)}
		>
			<span className="relative grid size-5 shrink-0 place-items-center">
				<input
					id={id}
					type="checkbox"
					className="peer size-5 cursor-pointer appearance-none rounded-md bg-sand-50 shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-[background-color,box-shadow] duration-150 ease-out-strong checked:bg-pine-900 checked:shadow-none"
					{...props}
				/>
				<Check
					aria-hidden="true"
					className="pointer-events-none absolute size-3.5 scale-75 text-sand-50 opacity-0 transition-[opacity,transform] duration-150 ease-out-strong peer-checked:scale-100 peer-checked:opacity-100"
				/>
			</span>
			{label}
		</label>
	);
}

export default Checkbox;
