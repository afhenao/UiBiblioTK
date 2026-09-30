import { Check } from "@phosphor-icons/react/Check";
import { cn } from "../../utils/cn.js";

function Checkbox({ id, label, className, ...props }) {
	return (
		<label htmlFor={id} className={cn("btk-checkbox", className)}>
			<span className="btk-checkbox__box">
				<input
					id={id}
					type="checkbox"
					className="btk-checkbox__input"
					{...props}
				/>
				<Check aria-hidden="true" className="btk-checkbox__check" />
			</span>
			{label}
		</label>
	);
}

export default Checkbox;
