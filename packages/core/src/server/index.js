// import {SocketCluster} from 'socketcluster';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export default function server() {
// Import .env and expand variables:
	dotenvExpand(dotenv.config({silent: false}));

	console.log(process.env.MYVAR);
}
