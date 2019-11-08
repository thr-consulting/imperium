import {ModelsOptions} from '@imperium/core';
import Auth from './Auth';
import Role from './Role';

export default function(options: ModelsOptions) {
	return {
		Auth: new Auth(options),
		Role,
	};
}
