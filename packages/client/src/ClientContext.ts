import React from 'react';
import type {IImperiumClient} from './types';

export const ClientContext = React.createContext(null as IImperiumClient | null);
