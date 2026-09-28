import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import TextField from "./TextField.jsx";

function PasswordField(props) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<TextField
			{...props}
			type={isVisible ? "text" : "password"}
			endAdornment={
				<button
					type="button"
					onClick={() => setIsVisible((visible) => !visible)}
					aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
					aria-pressed={isVisible}
					className="grid size-9 place-items-center rounded-lg text-ink-soft transition-colors duration-150 hover:bg-pine-900/5 hover:text-pine-900"
				>
					{isVisible ? (
						<EyeSlash aria-hidden="true" className="size-[18px]" />
					) : (
						<Eye aria-hidden="true" className="size-[18px]" />
					)}
				</button>
			}
		/>
	);
}

export default PasswordField;
