import Sample from './Sample';

export default function(connectors, ctx) {
	return {
		Sample: new Sample(connectors.mongo, ctx),
	};
}
