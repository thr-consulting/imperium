declare module 'jsx-pdf' {
	import type {TDocumentDefinitions} from 'pdfmake/interfaces';

	export function renderPdf(tag: JSX.Element): TDocumentDefinitions;
}
