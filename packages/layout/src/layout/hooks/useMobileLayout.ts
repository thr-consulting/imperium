import debug from 'debug';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useMediaQuery} from 'react-responsive';
import {actions, useLayoutState} from '../../state';

const d = debug('imperium.layout.hooks.useMobileLayout');

export function useMobileLayout() {
	const dispatch = useDispatch();
	const {isMobile} = useLayoutState();
	const isMobileX = useMediaQuery({query: '(max-width: 900px)'});
	useEffect(() => {
		if (isMobile !== isMobileX) {
			d(`Media query change detected: ${isMobile} -> ${isMobileX}`);
			dispatch(actions.setMobile(isMobileX));
		}
	}, [dispatch, isMobile, isMobileX]);
}
