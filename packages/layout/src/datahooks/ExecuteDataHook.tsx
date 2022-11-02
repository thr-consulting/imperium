import type {DataHook} from './types';

interface ExecuteDataHookProps {
	dataHook: DataHook;
	routeParams?: any;
	isMatching: boolean;
}

export function ExecuteDataHook({dataHook, routeParams, isMatching}: ExecuteDataHookProps) {
	dataHook({isMatching, routeParams});
	return null;
}
