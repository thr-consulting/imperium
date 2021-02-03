import type {IAuthContext} from './AuthContext';
import type {AuthLevel} from './AuthLevel';

export abstract class AbstractAuthSelector {
	public abstract getLevel(ctx: IAuthContext): Promise<AuthLevel>;
	public abstract getCacheId(): string;
}
