import { BookOpenText } from "@phosphor-icons/react/BookOpenText";
import { useState } from "react";
import { cn } from "../../utils/cn.js";

// Portadas subidas por MaterialesBiblioTK a Cloudinary: se piden ya optimizadas
// (formato y calidad automáticos, ancho máximo). Las URL pegadas a mano se usan tal cual
const patronCloudinary =
	/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/bibliotk\/materiales\/)/;

// Cada material puede tener dos copias de la portada: la remota (Cloudinary u otra URL)
// y la local del servidor. Se prueba primero la remota y, si no carga, la local
function fuentesPortada(material, ancho = 480) {
	const remota = material?.imagenUrl?.replace(
		patronCloudinary,
		`$1f_auto,q_auto,c_limit,w_${ancho}/$2`,
	);
	return [remota, material?.imagenLocal].filter(Boolean);
}

function PortadaVacia({ titulo, compacta, className }) {
	return (
		<div
			role="img"
			aria-label={titulo ? `${titulo}, sin portada` : "Sin portada"}
			className={cn(
				"btk-cover--empty",
				compacta && "btk-cover--compact",
				className,
			)}
		>
			<BookOpenText aria-hidden="true" className="btk-cover__icon" />
			{!compacta && <p className="btk-cover__title">{titulo}</p>}
		</div>
	);
}

function Portada({ fuentes, titulo, compacta, className }) {
	const [intento, setIntento] = useState(0);
	const fuente = fuentes[intento];

	if (!fuente) {
		return (
			<PortadaVacia titulo={titulo} compacta={compacta} className={className} />
		);
	}

	return (
		<img
			src={fuente}
			alt={titulo ? `Portada de ${titulo}` : ""}
			loading="lazy"
			decoding="async"
			onError={() => setIntento((actual) => actual + 1)}
			className={cn("btk-cover", className)}
		/>
	);
}

// Llena el contenedor (el tamaño lo pone la app). `material` trae imagenUrl, imagenLocal y titulo;
// `ancho` es el ancho que se pide a Cloudinary; `compacta`, miniatura sin el título escrito
function CoverImage({ material, ancho, compacta = false, className }) {
	const fuentes = fuentesPortada(material, ancho);

	// La key reinicia los intentos cuando cambia la portada del material
	return (
		<Portada
			key={fuentes.join(" ")}
			fuentes={fuentes}
			titulo={material?.titulo}
			compacta={compacta}
			className={className}
		/>
	);
}

export default CoverImage;
