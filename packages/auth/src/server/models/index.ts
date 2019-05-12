import Auth from './Auth';
import Role from './Role';

export default function(connectors, ctx) {
	if (!connectors.mongoose) throw new Error('Mongoose connector not defined');
	return {
		Auth: new Auth(ctx),
		Role,
	};
}
