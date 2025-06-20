import debug from 'debug';
import type {CSSProperties} from 'react';

const d = debug('imperium.example-web.sample-layout.components.ContentExample');

const style: CSSProperties = {
	backgroundColor: 'olive',
	height: '100%',
};

export default function ContentExample() {
	return <div style={style}>Content</div>;
}
