import Users from './Users';

export default function(connectors, ctx) {
	return {
		Users: new Users(connectors.mongo, ctx),
	};
}
