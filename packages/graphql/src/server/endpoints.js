import graphql from './graphql';
import graphiql from './graphiql';

export default function endpoints({app, connectors, modules, middleware}) {
	graphql({app, connectors, modules, middleware});
	graphiql({app});
}
