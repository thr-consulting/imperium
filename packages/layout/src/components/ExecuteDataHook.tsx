import type {DataHook} from '../types';

interface ExecuteDataHookProps {
	dataHook: DataHook;
}

export function ExecuteDataHook({dataHook}: ExecuteDataHookProps) {
	dataHook();
	return null;
}
