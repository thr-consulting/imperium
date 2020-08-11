import { EntityManager, EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { HistorySubscriberInterface } from 'typeorm-revisions/dist/historySubscriberInterface';
export declare enum HistoryActionType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}
export interface HistoryEntityInterface {
    id: number | string;
    makeActionAt: Date;
    originalID: number | string;
    action: HistoryActionType;
}
export declare function HistoryActionColumn(): Function;
export declare abstract class HistorySubscriber<Entity, HistoryEntity extends HistoryEntityInterface & Entity> implements HistorySubscriberInterface<Entity, HistoryEntity> {
    beforeHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void>;
    afterHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void>;
    abstract get entity(): Function;
    abstract get historyEntity(): Function;
    listenTo(): Function;
    createHistoryEntity(manager: Readonly<EntityManager>, entity: Entity): HistoryEntity | Promise<HistoryEntity>;
    afterInsert(event: InsertEvent<Entity>): Promise<void>;
    afterUpdate(event: UpdateEvent<Entity>): Promise<void>;
    beforeRemove(event: RemoveEvent<Entity>): Promise<void>;
    private createHistory;
}
export interface HistorySubscriberInterface<Entity, HistoryEntity> extends EntitySubscriberInterface<Entity> {
    entity: Function;
    historyEntity: Function;
    createHistoryEntity(manager: EntityManager, entity: Entity): HistoryEntity | Promise<HistoryEntity>;
    beforeHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void>;
    afterHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void>;
}
