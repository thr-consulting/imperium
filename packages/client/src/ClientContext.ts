import React from 'react';
import {IImperiumClient} from './types';

export const ClientContext = React.createContext(null as IImperiumClient | null);
