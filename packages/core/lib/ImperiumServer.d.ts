export interface ImperiumConnectors {
    create(): Promise<{
        [connectorName: string]: any;
    }>;
    close(): Promise<void>;
}
export interface ImperiumServerOptions {
    connectors: ImperiumConnectors;
}
export default class ImperiumServer {
    _connectors: ImperiumConnectors;
    constructor(options: ImperiumServerOptions);
    start(): Promise<this>;
    stop(): Promise<void>;
}
