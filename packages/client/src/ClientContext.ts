import React from 'react';
import type {ImperiumClient} from './ImperiumClient';

export const ClientContext = React.createContext(null as ImperiumClient | null);
