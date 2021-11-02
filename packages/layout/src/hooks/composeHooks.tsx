import debug from 'debug';
import React from 'react';

const d = debug('imperium.layout.hooks.composeHooks');

export function composeHooks(hooks: (props?: any) => any) {
	return Component => {
		if (!Component) {
			throw new Error('Component must be provided to compose');
		}

		if (!hooks) {
			return Component;
		}

		return props => {
			const hooksObject = typeof hooks === 'function' ? hooks(props) : hooks;

			// Flatten values from all hooks to a single object
			const hooksProps = Object.entries(hooksObject).reduce((memo, [hookKey, hook]) => {
				let hookValue = hook();

				if (Array.isArray(hookValue) || typeof hookValue !== 'object') {
					hookValue = {[hookKey]: hookValue};
				}

				Object.entries(hookValue).forEach(([key, value]) => {
					const duplicate = memo[key] ? value : props[key];

					if (typeof duplicate !== 'undefined') {
						d(`prop '${key}' exists, overriding with value: '${duplicate}'`);
					}
					// eslint-disable-next-line no-param-reassign
					memo[key] = value;
				});

				return memo;
			}, {});

			return <Component {...hooksProps} {...props} />;
		};
	};
}
