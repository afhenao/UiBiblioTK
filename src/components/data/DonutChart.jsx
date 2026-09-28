import { useState } from "react";
import { cn } from "../../utils/cn.js";
import { formatNumber, formatPercent } from "../../utils/format.js";

// Unidades del viewBox (120 × 120). Con pathLength="100" cada tramo se mide en porcentaje.
const radius = 47;
const strokeWidth = 14;
const activeStrokeWidth = 18;
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
		<div
			className={cn(
				"grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14",
				className,
			)}
		>
			<div className="relative mx-auto size-60 sm:size-64 md:size-72">
				<svg
					viewBox="0 0 120 120"
					aria-hidden="true"
					className="size-full -rotate-90"
				>
					{arcs.map((arc, index) => (
						// biome-ignore lint/a11y/noStaticElementInteractions: el SVG es decorativo (aria-hidden); la leyenda da la misma interacción con teclado y lector de pantalla
						<circle
							key={arc.key}
							cx="60"
							cy="60"
							r={radius}
							pathLength="100"
							fill="none"
							stroke={arc.color}
							strokeDasharray={`${arc.length} ${100 - arc.length}`}
							strokeDashoffset={arc.offset}
							onPointerEnter={() => setHoveredKey(arc.key)}
							onPointerLeave={() => setHoveredKey(null)}
							onClick={() => togglePinned(arc.key)}
							style={{
								strokeWidth:
									activeKey === arc.key ? activeStrokeWidth : strokeWidth,
								animationDelay: `${index * 70}ms`,
							}}
							className={cn(
								"cursor-pointer transition-[stroke-width,opacity] duration-150 ease-out-strong motion-safe:animate-draw",
								activeKey && activeKey !== arc.key && "opacity-35",
							)}
						/>
					))}
				</svg>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 grid place-items-center text-center"
				>
					<div>
						<p className="text-5xl leading-none font-semibold tracking-[-0.045em] text-pine-950">
							{formatValue(activeItem ? activeItem.value : total)}
						</p>
						<p className="mx-auto mt-2 max-w-28 text-xs leading-snug font-medium text-ink-soft">
							{activeItem ? activeItem.label : totalLabel}
						</p>
						{activeItem && (
							<p className="mt-1 text-xs font-semibold text-pine-900 tabular-nums">
								{formatShare(activeItem.share)}
							</p>
						)}
					</div>
				</div>
			</div>

			<p className="sr-only">{`${formatValue(total)} ${totalLabel}`}</p>

			<ul className="grid gap-1">
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
								"flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors duration-150 ease-out-strong hover:bg-sand-100",
								activeKey === item.key && "bg-sand-100",
							)}
						>
							<span className="flex min-w-0 items-center gap-3">
								<span
									aria-hidden="true"
									className="size-3 shrink-0 rounded-sm"
									style={{ backgroundColor: item.color }}
								/>
								<span className="truncate text-[15px] text-pine-900">
									{item.label}
								</span>
							</span>
							<span className="flex shrink-0 items-baseline gap-3">
								<span className="text-sm text-ink-soft tabular-nums">
									{formatShare(item.share)}
								</span>
								<span className="min-w-10 text-right text-2xl font-semibold tracking-[-0.03em] text-pine-950 tabular-nums">
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
