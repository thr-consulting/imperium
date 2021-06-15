import type {AuthenticationDomain, ServiceInfo} from '@imperium/auth-server';
import {CachedAuthentication} from '~lib/CachedAuthentication';

export class Authentication extends CachedAuthentication implements AuthenticationDomain {
	getServiceInfo(/* id: string */): Promise<ServiceInfo | null> {
		return Promise.resolve(null);
	}
}
