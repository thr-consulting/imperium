import type {AuthLevel} from './AuthLevel';

export abstract class AbstractAuthSelector {
	public abstract getLevel(ctx: unknown, user?: unknown): Promise<AuthLevel>;
	public abstract getCacheId(): string;
	public abstract getName(): string;
}
