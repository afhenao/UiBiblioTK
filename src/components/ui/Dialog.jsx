import { X } from "@phosphor-icons/react";
import { useEffect, useId, useRef } from "react";
import { cn } from "../../utils/cn.js";

const iconTones = {
	neutral: "bg-pine-900 text-honey-300",
	danger:
		"bg-clay-50 text-clay-600 shadow-[inset_0_0_0_1px_rgb(163_64_47/0.18)]",
};

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
			className={cn(
				"m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain rounded-[28px] bg-sand-50 p-0 text-ink shadow-[0_32px_80px_-32px_rgb(11_34_28/0.6)] backdrop:bg-pine-950/50 open:motion-safe:animate-rise-sm backdrop:motion-safe:animate-fade",
				className,
			)}
		>
			<div className="relative p-6 sm:p-8">
				{icon && (
					<span
						className={cn(
							"grid size-12 place-items-center rounded-2xl",
							iconTones[tone],
						)}
					>
						{icon}
					</span>
				)}
				<h2
					id={titleId}
					className={cn(
						"pr-10 font-display text-[1.75rem] leading-tight font-extrabold tracking-[-0.035em] text-pine-950",
						icon && "mt-5",
					)}
				>
					{title}
				</h2>
				{description && (
					<p
						id={descriptionId}
						className="mt-2 text-[15px] leading-relaxed text-ink-soft"
					>
						{description}
					</p>
				)}
				<div className="mt-6">{children}</div>
				{/* Va al final para que el foco inicial caiga en el primer control del contenido */}
				<button
					type="button"
					onClick={requestClose}
					disabled={!dismissible}
					aria-label="Cerrar"
					className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-pine-900/5 hover:text-pine-900 disabled:opacity-40 sm:top-5 sm:right-5"
				>
					<X aria-hidden="true" className="size-[18px]" />
				</button>
			</div>
		</dialog>
	);
}

export default Dialog;
