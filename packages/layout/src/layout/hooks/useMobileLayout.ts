import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useMediaQuery} from 'react-responsive';
import {actions} from '../../state';

export function useMobileLayout() {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({query: '(max-width: 900px)'});
	useEffect(() => {
		dispatch(actions.setMobile(isMobile));
	}, [dispatch, isMobile]);
}
