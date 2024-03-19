import { useMonaco } from "@monaco-editor/react";
import { useCallback } from "react";
export default function useAbapEditor() {
	const monaco = useMonaco();
	const monacoEditor = monaco?.editor;
	//const model = monacoEditor?.getModels()[0];
	//const editor = monacoEditor?.getEditors()[0];

	/**
	 * Navega a una posición, pasado por parámetro, en el editor
	 */
	const navigateToPosition = useCallback(
		(lineNumber: number, column = 1) => {
			if (monacoEditor) {
				let editor = monacoEditor?.getEditors()[0];
				// Se posiciona en la línea del editor
				editor?.setPosition({
					lineNumber: lineNumber,
					column: column,
				});

				// Hace aparecer la linea pasada, con el método usado lo coloca al
				// principio del editor.
				editor?.revealLineNearTop(lineNumber);

				// Activa el focus en el editor
				editor.focus();
			}
		},
		[monacoEditor]
	);
	const navigateToTop = useCallback(() => {
		if (monacoEditor) {
			let editor = monacoEditor?.getEditors()[0];

			editor.setScrollPosition({ scrollTop: 0 });
			editor?.setPosition({
				lineNumber: 1,
				column: 1,
			});

			editor.focus();
		}
	}, [monacoEditor]);

	return { navigateToPosition, navigateToTop };
}
