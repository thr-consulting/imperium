import isArray from 'lodash/isArray';
// import {Map} from 'immutable';

console.log('client launch!');
import('immutable').then(({Map}) => {
	console.log(isArray(['one']));
	const a = new Map({o: 'a'});
	console.log(a);
});
