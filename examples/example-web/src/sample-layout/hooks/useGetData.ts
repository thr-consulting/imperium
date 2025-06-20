import debug from 'debug';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setId} from '../state';
import {useGetDataQuery} from './getData';

const d = debug('imperium.example-web.sample-layout.hooks.useGetData');

export function useGetData(routeParams: any) {
	const dispatch = useDispatch();
	const {loading, data, error} = useGetDataQuery();

	d('RouteParams: ', routeParams);

	useEffect(() => {
		if (!loading) {
			d('Dispatching state data');
			dispatch(setId(data?.getSubscriptionValue?.id || ''));
		}
	}, [loading, data, error, dispatch]);
}
