import debug from 'debug';
import {useContext} from 'react';
import {FragmentContext} from './FragmentContext';

const d = debug('imperium.context.useFragments');

export default function useFragments() {
	return useContext(FragmentContext);
}
