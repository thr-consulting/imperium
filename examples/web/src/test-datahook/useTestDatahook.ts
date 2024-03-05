import type {DataHookParams} from '@imperium/layout';
import debug from 'debug';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setText} from './state';

const d = debug('imperium.web.test-datahook.useTestDatahook');

export function useTestDatahook({routeParams, isMatching}: DataHookParams) {
	const dispatch = useDispatch();

	useEffect(() => {
		d(`Firing use effect: ${routeParams} ${isMatching}`);

		if (isMatching) {
			dispatch(setText(routeParams.value));
		} else {
			dispatch(setText(''));
		}
	}, [dispatch, isMatching, routeParams]);
}
