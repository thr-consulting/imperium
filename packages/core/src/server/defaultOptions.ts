export default {
	port: process.env.PORT || 4001,
	nodeEnv: process.env.NODE_ENV,
	production: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined,
	development: process.env.NODE_ENV === 'development',
	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure',
};
