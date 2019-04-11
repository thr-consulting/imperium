import Auth from './Auth';

export default function(connectors, ctx) {
	if (!connectors.mongo) throw new Error('Mongo connector not defined');
	return {
		Auth: new Auth(connectors.mongo, ctx),
	};
}
