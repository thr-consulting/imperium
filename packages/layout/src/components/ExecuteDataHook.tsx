import type {DataHook} from '../types';

interface ExecuteDataHookProps {
	dataHook: DataHook;
	routeParams?: any;
}

export function ExecuteDataHook({dataHook, routeParams}: ExecuteDataHookProps) {
	dataHook(routeParams);
	return null;
}
