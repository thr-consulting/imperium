/* eslint-disable react/react-in-jsx-scope */
// @ts-nocheck
import PDFMake from 'pdfmake';
import fs from 'fs';
import JsxPdf from 'jsx-pdf';

const fonts = {
	Courier: {
		normal: 'Courier',
		bold: 'Courier-Bold',
		italics: 'Courier-Oblique',
		bolditalics: 'Courier-BoldOblique',
	},
	Helvetica: {
		normal: 'Helvetica',
		bold: 'Helvetica-Bold',
		italics: 'Helvetica-Oblique',
		bolditalics: 'Helvetica-BoldOblique',
	},
	Times: {
		normal: 'Times-Roman',
		bold: 'Times-Bold',
		italics: 'Times-Italic',
		bolditalics: 'Times-BoldItalic',
	},
	Symbol: {
		normal: 'Symbol',
	},
	ZapfDingbats: {
		normal: 'ZapfDingbats',
	},
};

export async function genReport() {
	return new Promise(resolve => {
		const pdfMake = new PDFMake(fonts);

		const content = (
			<document defaultStyle={{font: 'Helvetica', fontSize: 12}}>
				<content>This will appear in my PDF!</content>
			</document>
		);

		const stream = pdfMake.createPdfKitDocument(JsxPdf.renderPdf(content));

		// write the stream to a file; this could also be streamed to an HTTP connection, stdout etc
		stream.on('finish', () => {
			resolve();
		});
		stream.pipe(fs.createWriteStream('./test.pdf'));
		stream.end();
	});
}
