import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export function ScrollToTop() {
	const {pathname} = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);

		const selection = document.querySelector('.imperiumLayoutContent');
		if (selection) {
			selection.scrollTop = 0;
		}
	}, [pathname]);

	return null;
}
