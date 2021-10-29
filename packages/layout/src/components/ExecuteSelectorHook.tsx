import debug from 'debug';
import type {StateSelectorHook} from '../types';

const d = debug('imperium.layout.components.ExecuteSelectorHook');

interface SelectorHookProps {
	hook: StateSelectorHook<Record<string, unknown>>;
	render: (data: Record<string, unknown>) => JSX.Element | null;
}

export function ExecuteSelectorHook({render, hook}: SelectorHookProps) {
	const data = hook();
	return render(data);
}
