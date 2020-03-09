import {ImperiumEnvironment} from './types';

const defaultEnvironment: ImperiumEnvironment = {
	port: parseInt(process.env.SERVER_PORT || '4001', 10),
	nodeEnv: process.env.NODE_ENV || '',
	production: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined,
	development: process.env.NODE_ENV === 'development',
};

export default defaultEnvironment;
