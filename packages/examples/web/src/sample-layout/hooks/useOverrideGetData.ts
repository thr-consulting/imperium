import debug from 'debug';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setId} from '../state';

const d = debug('imperium.examples.web.sample-layout.useOverrideGetData');

export function useOverrideGetData(routeParams: any) {
	const dispatch = useDispatch();

	d('RouteParams: ', routeParams);

	useEffect(() => {
		dispatch(setId('overridden'));
	}, [dispatch]);
}
