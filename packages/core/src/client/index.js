import isArray from 'lodash/isArray';
// import {Map} from 'immutable';

import('immutable').then(({Map}) => {
	console.log('client launch!');
	console.log(isArray(['one']));
	const a = new Map({o: 'a'});
	console.log(a);
});
