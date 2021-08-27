import React from 'react';
import debug from 'debug';
import {useParams} from 'react-router-dom';
import {routes} from '../routes';

const d = debug('imperium.example.web.sample.components.ParamTest');

interface ParamTestParams {
	id: string;
	thing: string;
}

export function ParamTest() {
	const {id, thing} = useParams<ParamTestParams>();
	d('param test');
	d(routes.to.ving({id: 'fdafdas', thing: 'hhhhhhhhh'}));
	d(routes.to.home());
	return (
		<div>
			hello world {id} {thing}
		</div>
	);
}
