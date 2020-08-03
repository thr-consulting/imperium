import debug from 'debug';
import {
	Column,
	EntityManager,
	EntityMetadata,
	EntitySubscriberInterface,
	InsertEvent,
	RemoveEvent,
	UpdateEvent,
} from 'typeorm';
import {HistorySubscriberInterface} from 'typeorm-revisions/dist/historySubscriberInterface';

const d = debug('app.todo.lib.TypeORMRevisionHistory');

type HistoryEvent<HistoryEntity> = (history: HistoryEntity) => void | Promise<void>;

export enum HistoryActionType {
	CREATED = 'CREATED',
	UPDATED = 'UPDATED',
	DELETED = 'DELETED',
}

export interface HistoryEntityInterface {
	id: number | string;
	makeActionAt: Date;
	originalID: number | string;
	action: HistoryActionType;
}

export function HistoryActionColumn(): Function {
	return Column({
		default: HistoryActionType.CREATED,
		enum: Object.values(HistoryActionType),
		type: 'simple-enum',
	});
}

export abstract class HistorySubscriber<Entity, HistoryEntity extends HistoryEntityInterface & Entity>
	implements HistorySubscriberInterface<Entity, HistoryEntity> {
	// these are optional hooks
	public beforeHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void> {}
	public afterHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void> {}

	public abstract get entity(): Function;
	public abstract get historyEntity(): Function;

	public listenTo(): Function {
		return this.entity;
	}

	public createHistoryEntity(manager: Readonly<EntityManager>, entity: Entity): HistoryEntity | Promise<HistoryEntity> {
		return manager.create(this.historyEntity, entity);
	}

	public async afterInsert(event: InsertEvent<Entity>): Promise<void> {
		await this.createHistory(event.manager, event.metadata, HistoryActionType.CREATED, event.entity);
	}

	public async afterUpdate(event: UpdateEvent<Entity>): Promise<void> {
		await this.createHistory(event.manager, event.metadata, HistoryActionType.UPDATED, event.entity);
	}

	public async beforeRemove(event: RemoveEvent<Entity>): Promise<void> {
		await this.createHistory(event.manager, event.metadata, HistoryActionType.DELETED, event.entity);
	}

	private async createHistory(
		manager: Readonly<EntityManager>,
		metadata: Readonly<EntityMetadata>,
		action: Readonly<HistoryActionType>,
		entity?: Entity,
	): Promise<void> {
		if (!entity || Object.keys(metadata.propertiesMap).includes('action')) {
			return;
		}

		const history = await this.createHistoryEntity(manager, entity);
		history.action = action;

		metadata.primaryColumns.forEach(primaryColumn => {
			history.originalID = Reflect.get(history, primaryColumn.propertyName);
			Reflect.deleteProperty(history, primaryColumn.propertyName);
		});

		await this.beforeHistory(history.action, history);
		await manager.save(history);
		await this.afterHistory(history.action, history);
	}
}

export interface HistorySubscriberInterface<Entity, HistoryEntity> extends EntitySubscriberInterface<Entity> {
	entity: Function;
	historyEntity: Function;
	createHistoryEntity(manager: EntityManager, entity: Entity): HistoryEntity | Promise<HistoryEntity>;
	beforeHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void>;
	afterHistory(action: HistoryActionType, history: HistoryEntity): void | Promise<void>;
}
