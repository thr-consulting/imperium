import React from 'react';
import debug from 'debug';
import {useParams} from 'react-router-dom';
import type {routes} from '../routes';

const d = debug('imperium.example.web.sample.components.ParamTest');

export function ParamTest() {
	const {id, thing} = useParams<typeof routes.types.params>();
	return (
		<div>
			hello world {id} {thing}
		</div>
	);
}
