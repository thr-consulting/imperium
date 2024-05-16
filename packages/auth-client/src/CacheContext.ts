import {createContext} from 'react';
import {DexieCache} from './DexieCache';

export const CacheContext = createContext<DexieCache>(new DexieCache());
