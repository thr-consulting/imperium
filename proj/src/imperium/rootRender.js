import React from 'react';
// import {NotificationSystem} from '@thx/notifications';
// import {DialogSystem} from '@thx/dialog';
// import {ApolloProvider} from 'react-apollo';

export default function rootRender(inner) {
	return (
		<div id="yay">
			{inner()}
		</div>
	);
}
