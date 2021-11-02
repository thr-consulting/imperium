import debug from 'debug';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useGetDataQuery} from './getData';
import {setParam} from '../state';

const d = debug('imperium.examples.web.sample-layout.useGetData');

export function useGetData(routeParams: any) {
	const dispatch = useDispatch();
	const {loading, data, error} = useGetDataQuery();

	d('RouteParams: ', routeParams);

	useEffect(() => {
		if (!loading) {
			dispatch(setParam(data?.getSubscriptionValue?.id || ''));
		}
	}, [loading, data, error, dispatch]);
}
