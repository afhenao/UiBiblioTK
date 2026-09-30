import { Eye } from "@phosphor-icons/react/Eye";
import { EyeSlash } from "@phosphor-icons/react/EyeSlash";
import { useState } from "react";
import TextField from "./TextField.jsx";

function PasswordField(props) {
	const [isVisible, setIsVisible] = useState(false);
	const Icon = isVisible ? EyeSlash : Eye;

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
					className="btk-password-toggle"
				>
					<Icon aria-hidden="true" className="btk-password-toggle__icon" />
				</button>
			}
		/>
	);
}

export default PasswordField;
