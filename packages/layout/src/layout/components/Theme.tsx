import type {ReactNode} from 'react';
import {MantineProvider} from '@mantine/core';

export function Theme({children}: {children: ReactNode}) {
	return (
		<MantineProvider
			theme={{
				// @ts-ignore
				colorScheme: import.meta.env.VITE_THEME === 'light' ? 'light' : 'dark',
				fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
				fontSizes: {
					xs: 10,
					sm: 12,
					md: 14,
					lg: 16,
					xl: 18,
				},
			}}
			withGlobalStyles
			withNormalizeCSS
		>
			{children}
		</MantineProvider>
	);
}
