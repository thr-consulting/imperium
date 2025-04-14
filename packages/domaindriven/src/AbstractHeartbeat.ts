export interface AbstractHeartbeatCon<CTX> {
	name: string;
	cronSchedule?: string;
	ctx: CTX;
}

export abstract class AbstractHeartbeat<T, CTX> {
	protected constructor({name, cronSchedule, ctx}: AbstractHeartbeatCon<CTX>) {
		this.name = name;
		this.cronSchedule = cronSchedule;
		this.ctx = ctx;
	}

	public readonly name: string;
	public readonly cronSchedule?: string; // cron schedule
	public abstract select(): Promise<T[]>;
	public abstract command(item: T): Promise<void>;

	protected readonly ctx: CTX;
}
