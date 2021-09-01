import debug from 'debug';
import type {SelectorHook} from '../types';

const d = debug('imperium.layout.components.ExecuteSelectorHook');

interface SelectorHookProps {
	hook: SelectorHook;
	render: (data: Record<string, unknown>) => JSX.Element | null;
}

export function ExecuteSelectorHook({render, hook}: SelectorHookProps) {
	const data = hook();
	return render(data);
}
