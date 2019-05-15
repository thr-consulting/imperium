/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import {Context} from '@imperium/core';
import {ServerAuth} from '../../types';

declare global {
	namespace Express {
		export interface Request {
			context: Context,
			auth: ServerAuth,
		}
	}
}
