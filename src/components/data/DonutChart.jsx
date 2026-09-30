import { useState } from "react";
import { cn } from "../../utils/cn.js";
import { formatNumber, formatPercent } from "../../utils/format.js";

// Unidades del viewBox (120 × 120). Con pathLength="100" cada tramo se mide en porcentaje.
// El grosor del trazo (14, o 18 en el tramo activo) está en DonutChart.css.
const radius = 47;
// Separación de superficie entre tramos (~2 px al tamaño renderizado)
const gap = 0.4;
const minArc = 0.8;

function DonutChart({
	segments,
	totalLabel = "en total",
	formatValue = formatNumber,
	formatShare = formatPercent,
	className,
}) {
	const [hoveredKey, setHoveredKey] = useState(null);
	const [pinnedKey, setPinnedKey] = useState(null);

	const total = segments.reduce((sum, segment) => sum + segment.value, 0);
	const items = segments.map((segment) => ({
		...segment,
		share: total ? segment.value / total : 0,
	}));
	const visibleItems = items.filter((item) => item.value > 0);
	const hasGaps = visibleItems.length > 1;

	let start = 0;
	const arcs = visibleItems.map((item) => {
		const length = hasGaps ? Math.max(item.share * 100 - gap, minArc) : 100;
		const offset = -(start * 100 + (hasGaps ? gap / 2 : 0));
		start += item.share;
		return { ...item, length, offset };
	});

	const activeKey = hoveredKey ?? pinnedKey;
	const activeItem = items.find((item) => item.key === activeKey);

	function togglePinned(key) {
		setPinnedKey((current) => (current === key ? null : key));
	}

	return (
		<div className={cn("btk-donut", className)}>
			<div className="btk-donut__chart">
				<svg
					viewBox="0 0 120 120"
					aria-hidden="true"
					className="btk-donut__svg"
				>
					{arcs.map((arc, index) => (
						// biome-ignore lint/a11y/noStaticElementInteractions: el SVG es decorativo (aria-hidden); la leyenda da la misma interacción con teclado y lector de pantalla
						<circle
							key={arc.key}
							cx="60"
							cy="60"
							r={radius}
							pathLength="100"
							strokeDasharray={`${arc.length} ${100 - arc.length}`}
							strokeDashoffset={arc.offset}
							onPointerEnter={() => setHoveredKey(arc.key)}
							onPointerLeave={() => setHoveredKey(null)}
							onClick={() => togglePinned(arc.key)}
							// Solo datos: el color del tramo y su retraso de entrada; los estilos están en DonutChart.css
							style={{
								"--btk-donut-color": arc.color,
								"--btk-donut-delay": `${index * 70}ms`,
							}}
							className={cn(
								"btk-donut__arc",
								activeKey === arc.key && "btk-donut__arc--active",
								activeKey && activeKey !== arc.key && "btk-donut__arc--dimmed",
							)}
						/>
					))}
				</svg>
				<div aria-hidden="true" className="btk-donut__center">
					<div>
						<p className="btk-donut__value">
							{formatValue(activeItem ? activeItem.value : total)}
						</p>
						<p className="btk-donut__label">
							{activeItem ? activeItem.label : totalLabel}
						</p>
						{activeItem && (
							<p className="btk-donut__share">
								{formatShare(activeItem.share)}
							</p>
						)}
					</div>
				</div>
			</div>

			<p className="btk-donut__summary">{`${formatValue(total)} ${totalLabel}`}</p>

			<ul className="btk-donut__legend">
				{items.map((item) => (
					<li key={item.key}>
						<button
							type="button"
							aria-pressed={pinnedKey === item.key}
							onPointerEnter={() => setHoveredKey(item.key)}
							onPointerLeave={() => setHoveredKey(null)}
							onFocus={() => setHoveredKey(item.key)}
							onBlur={() => setHoveredKey(null)}
							onClick={() => togglePinned(item.key)}
							className={cn(
								"btk-donut__item",
								activeKey === item.key && "btk-donut__item--active",
							)}
						>
							<span className="btk-donut__key">
								<span
									aria-hidden="true"
									className="btk-donut__swatch"
									style={{ "--btk-donut-color": item.color }}
								/>
								<span className="btk-donut__name">{item.label}</span>
							</span>
							<span className="btk-donut__figures">
								<span className="btk-donut__percent">
									{formatShare(item.share)}
								</span>
								<span className="btk-donut__count">
									{formatValue(item.value)}
								</span>
							</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default DonutChart;
