export class ImperiumError extends Error {
	private readonly userMessage?: string;
	constructor(message: string, userMessage?: string) {
		super(message);
		this.userMessage = userMessage;
	}
}
