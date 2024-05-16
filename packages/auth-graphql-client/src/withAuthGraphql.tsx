import {renewToken, setAuthenticated, useAccessToken} from '@imperium/auth-client';
import type {Hoc} from '@imperium/client';
import {type ComponentType, memo, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import type {AuthGraphqlBacking} from './AuthGraphqlBacking';

interface WithAuthGraphqlOpts {
	backing: AuthGraphqlBacking;
}

export function withAuthGraphql({backing}: WithAuthGraphqlOpts) {
	return (): Hoc => {
		return function authGraphqlHoc(Wrapped: ComponentType) {
			const displayName = Wrapped.displayName || Wrapped.name || 'Component';
			const MemoWrapped = memo(Wrapped);

			function WithAuthGraphql(props: any) {
				const {token} = useAccessToken();
				const dispatch = useDispatch();
				useEffect(() => {
					backing.setToken(token);
				}, [token]);

				useEffect(() => {
					backing.setPublishFn(tkn => {
						if (tkn) {
							dispatch(renewToken(tkn));
						} else {
							dispatch(setAuthenticated({token: null}));
						}
					});
				}, [dispatch]);

				return <MemoWrapped {...props} />;
			}

			WithAuthGraphql.displayName = `withAuthGraphql(${displayName})`;

			return WithAuthGraphql;
		};
	};
}
