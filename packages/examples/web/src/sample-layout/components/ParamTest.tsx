import debug from 'debug';
import React from 'react';
import {useParams} from 'react-router-dom';
import type {routes} from '../routes';

const d = debug('imperium.examples.web.sample.components.ParamTest');

export function ParamTest() {
	const {myParam} = useParams<typeof routes.types.withParam>();
	return <div>My param: {myParam}</div>;
}
