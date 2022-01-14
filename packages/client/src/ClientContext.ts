import {createContext} from 'react';
import type {ImperiumClient} from './ImperiumClient';

export const ClientContext = createContext(null as ImperiumClient | null);
