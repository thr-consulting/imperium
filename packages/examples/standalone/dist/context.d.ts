import type { connectors } from './connectors';
export declare function contextCreator(conn: typeof connectors, id: string): {
    domainSimple: import("@imperium/context-manager").ContextManager<{
        MyModel1: () => void;
        MyDataLoader1: (conn: import("@imperium/context-manager").Connector<{
            mongo: import("@imperium/context-manager").ConnectorsConfig<number>;
        }>) => void;
    }, import("@imperium/context-manager").Connector<{
        mongo: import("@imperium/context-manager").ConnectorsConfig<number>;
    }>, unknown>;
    domainAdvanced: import("@imperium/context-manager").ContextManager<{
        SecureModel: () => typeof import("@imperium/domain-advanced/dist/SecureModel").SecureModel;
        Score: () => typeof import("@imperium/domain-advanced/dist/Score").Score;
    }, import("@imperium/context-manager").Connector<{
        pg: import("@imperium/context-manager").ConnectorsConfig<import("typeorm").Connection>;
    }>, import("@imperium/auth-server").AuthRequiredDomain<any>>;
    domainAnything: {
        anything: number;
    };
};
export declare type Context = ReturnType<typeof contextCreator>;
