// @flow

import React from 'react';
import type {ChildrenArray} from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../NotFound';

type Props = {
	children: ChildrenArray<*>,
};

export default function SwitchWithError(props: Props) {
	return (
		<Switch>
			{props.children}
			<Route component={NotFound}/>
		</Switch>
	);
}
