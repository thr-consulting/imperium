import graphql from './graphql';
import graphiql from './graphiql';

export default function endpoints({app, connectors, modules}) {
	graphql({app, connectors, modules});
	graphiql({app});
}
