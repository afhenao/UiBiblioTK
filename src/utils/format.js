const todayFormatter = new Intl.DateTimeFormat("es-ES", {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
});

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
	day: "numeric",
	month: "long",
	year: "numeric",
});

const numberFormatter = new Intl.NumberFormat("es-ES");

const percentFormatter = new Intl.NumberFormat("es-ES", {
	style: "percent",
	maximumFractionDigits: 1,
});

export function formatToday(date = new Date()) {
	const label = todayFormatter.format(date);
	return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatDate(value) {
	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}

export function formatNumber(value) {
	return numberFormatter.format(value);
}

export function formatPercent(value) {
	return percentFormatter.format(value);
}

const relativeFormatter = new Intl.RelativeTimeFormat("es-ES", {
	numeric: "auto",
});

const shortDateFormatter = new Intl.DateTimeFormat("es-ES", {
	day: "numeric",
	month: "short",
});

// "hace un momento", "hace 5 minutos", "hace 2 horas"; desde el día anterior, la fecha corta ("20 oct")
export function formatRelativeTime(value, now = Date.now()) {
	const date = value instanceof Date ? value : new Date(value);

	if (Number.isNaN(date.getTime())) return "";

	const seconds = Math.round((date.getTime() - now) / 1000);

	if (seconds > -45) return "hace un momento";

	const minutes = Math.round(seconds / 60);

	if (minutes > -60) return relativeFormatter.format(minutes, "minute");

	const hours = Math.round(minutes / 60);

	if (hours > -24) return relativeFormatter.format(hours, "hour");

	return shortDateFormatter.format(date);
}
