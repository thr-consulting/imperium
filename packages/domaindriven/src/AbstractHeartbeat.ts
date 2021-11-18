interface AbstractHeartbeatCon<CTX> {
	name: string;
	ctx: CTX;
}

export abstract class AbstractHeartbeat<T, CTX> {
	protected constructor({name, ctx}: AbstractHeartbeatCon<CTX>) {
		this.name = name;
		this.ctx = ctx;
	}

	public readonly name: string;
	public abstract select(): Promise<T[]>;
	public abstract command(item: T): Promise<void>;

	protected readonly ctx: CTX;
}
