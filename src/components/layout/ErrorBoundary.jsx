import { ArrowsClockwise } from "@phosphor-icons/react/ArrowsClockwise";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";
import { Component } from "react";
import Button from "../ui/Button.jsx";

// Las clases siguen siendo la única forma de atrapar errores de render en React;
// no hay equivalente en hooks. Cubre errores inesperados que romperían toda la app
// (una excepción de render deja la pantalla en blanco sin esto).
class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error("Error atrapado por ErrorBoundary:", error, info);
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (!this.state.hasError) {
			return this.props.children;
		}

		return (
			<div className="btk-error-screen">
				<div className="btk-error-screen__card">
					<span className="btk-error-screen__icon">
						<WarningCircle
							aria-hidden="true"
							className="btk-error-screen__glyph"
						/>
					</span>
					<h1 className="btk-error-screen__title">Algo salió mal</h1>
					<p className="btk-error-screen__text">
						Ocurrió un error inesperado. Recarga la página para intentar de
						nuevo.
					</p>
					<Button
						className="btk-error-screen__action"
						onClick={this.handleReload}
					>
						<ArrowsClockwise
							aria-hidden="true"
							className="btk-error-screen__reload-icon"
						/>
						Recargar
					</Button>
				</div>
			</div>
		);
	}
}

export default ErrorBoundary;
