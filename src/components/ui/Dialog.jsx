import { X } from "@phosphor-icons/react/X";
import { useEffect, useId, useRef } from "react";
import { cn } from "../../utils/cn.js";

function Dialog({
	open,
	onClose,
	title,
	description,
	icon,
	tone = "neutral",
	dismissible = true,
	className,
	children,
}) {
	const dialogRef = useRef(null);
	// Props más recientes para los listeners nativos, que se registran una sola vez
	const latestRef = useRef({ open, onClose, dismissible });
	const titleId = useId();
	const descriptionId = useId();

	useEffect(() => {
		latestRef.current = { open, onClose, dismissible };
	});

	useEffect(() => {
		const dialog = dialogRef.current;

		// Escape cierra el <dialog> de forma nativa; solo se impide cuando no se puede descartar
		function handleCancel(event) {
			if (!latestRef.current.dismissible) event.preventDefault();
		}

		// Tras un cierre nativo se avisa a la app para que su estado vuelva a "cerrado".
		// El evento llega en el siguiente frame: si el diálogo ya se reabrió, se ignora.
		function handleNativeClose() {
			if (!dialog.open && latestRef.current.open) latestRef.current.onClose?.();
		}

		dialog.addEventListener("cancel", handleCancel);
		dialog.addEventListener("close", handleNativeClose);

		return () => {
			dialog.removeEventListener("cancel", handleCancel);
			dialog.removeEventListener("close", handleNativeClose);
		};
	}, []);

	useEffect(() => {
		const dialog = dialogRef.current;

		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	function requestClose() {
		if (dismissible) onClose?.();
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: el clic solo cierra desde el fondo; con teclado se cierra con Escape o con el botón Cerrar
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			aria-describedby={description ? descriptionId : undefined}
			onClick={(event) => {
				if (event.target === event.currentTarget) requestClose();
			}}
			className={cn("btk-dialog", className)}
		>
			<div className="btk-dialog__body">
				{icon && (
					<span className={cn("btk-dialog__icon", `btk-dialog__icon--${tone}`)}>
						{icon}
					</span>
				)}
				<h2 id={titleId} className="btk-dialog__title">
					{title}
				</h2>
				{description && (
					<p id={descriptionId} className="btk-dialog__description">
						{description}
					</p>
				)}
				<div className="btk-dialog__content">{children}</div>
				{/* Va al final para que el foco inicial caiga en el primer control del contenido */}
				<button
					type="button"
					onClick={requestClose}
					disabled={!dismissible}
					aria-label="Cerrar"
					className="btk-dialog__close"
				>
					<X aria-hidden="true" className="btk-dialog__close-icon" />
				</button>
			</div>
		</dialog>
	);
}

export default Dialog;
