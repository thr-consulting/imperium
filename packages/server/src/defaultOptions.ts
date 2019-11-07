export default {
	port: parseInt(process.env.PORT || '4001', 10),
	nodeEnv: process.env.NODE_ENV,
	production: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined,
	development: process.env.NODE_ENV === 'development',
};
