import { Connector } from '@imperium/context-manager';
import SharedCache from '@thx/sharedcache';
export declare const connectors: Connector<{
    mongo: {
        connect(): Promise<number>;
        close(): Promise<void>;
    };
    pg: {
        connect(): Promise<import("typeorm").Connection>;
        close(pg: any): Promise<void>;
    };
    sharedCache: {
        connect(): Promise<SharedCache>;
        close(): Promise<void>;
    };
}>;
