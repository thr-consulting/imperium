import React from 'react';
import debug from 'debug';
import {useParams} from 'react-router-dom';
import {routes} from '../routes';

const d = debug('imperium.example.web.sample.components.ParamTest');

export function ParamTest() {
	const {id, thing} = useParams<typeof routes.types.params>();
	d('param test');
	d(routes.to.params({id: 'id', thing: 'thing'}));
	d(routes.to.home());
	return (
		<div>
			hello world {id} {thing}
		</div>
	);
}
